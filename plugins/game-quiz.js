import axios from "axios";
import { Quiz } from "../lib/quiz.js";

let handler = async (m, { conn, text, botname, usedPrefix, command }) => {
  try {
    // Initialize quiz if not already active
    conn.quiz = conn.quiz || new Quiz();

    // Help menu
    if (!text || text === 'help') {
      return await showHelpMenu(conn, m, botname, usedPrefix);
    }

    const args = text.trim().split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'start':
        await handleQuizStart(conn, m);
        break;
        
      case 'stop':
        await handleQuizStop(conn, m);
        break;
        
      case 'score':
        await handleQuizScore(conn, m);
        break;
        
      case 'leaderboard':
      case 'top':
        await showLeaderboard(conn, m);
        break;
        
      default:
        await handleQuizAnswer(conn, m, text);
    }
  } catch (error) {
    console.error("Quiz error:", error);
    await conn.reply(m.chat, `❌ Quiz operation failed\n${error.message}`, m);
  }
};

// ========== COMMAND HANDLERS ==========

async function showHelpMenu(conn, m, botname, usedPrefix) {
  const helpText = `
📚 *${botname} Quiz Bot* 📚

⚡ *Commands:*
▢ ${usedPrefix}quiz start - Begin a new quiz
▢ ${usedPrefix}quiz stop - End current quiz
▢ ${usedPrefix}quiz score - Check your scores
▢ ${usedPrefix}quiz leaderboard - Show top players

🎮 *How to Play:*
During a quiz, simply reply with the number (1-4) of your answer choice.
Each question has a 30-second time limit.

🏆 *Scoring:*
- Correct answer: +10 points
- Fast bonus: Up to +5 extra points for quick answers
- Streak bonus: +2 points for each consecutive correct answer
`.trim();

  await conn.reply(m.chat, helpText, m);
}

async function handleQuizStart(conn, m) {
  if (conn.quiz.isActive(m.chat)) {
    return await conn.reply(m.chat, "⚠️ There's already an active quiz in this chat! Type 'quiz stop' to end it.", m);
  }

  await conn.reply(m.chat, "🔄 Preparing quiz questions... Please wait...", m);
  
  try {
    // Fetch questions (API or local)
    const questions = await conn.quiz.loadQuestions();
    
    if (!questions?.length) {
      return await conn.reply(m.chat, "❌ Couldn't load questions. Please try again later.", m);
    }

    // Start quiz with shuffled questions
    conn.quiz.startSession(m.chat, shuffleArray(questions));
    
    // Send first question with better formatting
    await sendQuestion(conn, m.chat, conn.quiz.getCurrentQuestion(m.chat));
  } catch (err) {
    console.error("Quiz start error:", err);
    await conn.reply(m.chat, "❌ Failed to start quiz. Please try again.", m);
  }
}

async function handleQuizStop(conn, m) {
  if (!conn.quiz.isActive(m.chat)) {
    return await conn.reply(m.chat, "ℹ️ No active quiz to stop!", m);
  }

  const results = conn.quiz.endSession(m.chat);
  await sendResults(conn, m.chat, results, m.sender);
}

async function handleQuizScore(conn, m) {
  const userScores = await conn.quiz.getUserScores(m.sender);
  await sendScoreCard(conn, m.chat, userScores, m.sender);
}

async function showLeaderboard(conn, m) {
  const topPlayers = await conn.quiz.getLeaderboard(10); // Top 10 players
  await sendLeaderboard(conn, m.chat, topPlayers);
}

async function handleQuizAnswer(conn, m, text) {
  if (!conn.quiz.isActive(m.chat)) {
    return await conn.reply(m.chat, "ℹ️ Type 'quiz start' to begin a new quiz!", m);
  }

  const answer = parseInt(text);
  if (isNaN(answer) || answer < 1 || answer > 4) {
    return await conn.reply(m.chat, "❌ Please answer with a number between 1-4!", m);
  }

  const response = conn.quiz.submitAnswer(
    m.chat, 
    m.sender, 
    answer - 1, // Convert to 0-based index
    Date.now() // Timestamp for response time
  );
  
  if (response.correct !== undefined) {
    // Send immediate feedback
    const feedback = response.correct 
      ? `✅ *Correct!* (+${response.pointsEarned} points)` 
      : `❌ *Incorrect!* The right answer was ${response.correctAnswer + 1}`;
    
    await conn.reply(m.chat, feedback, m);
    
    // Send explanation if available
    if (response.explanation) {
      await conn.reply(m.chat, `💡 *Explanation:* ${response.explanation}`, m);
    }

    // Handle next question or end quiz
    const nextQuestion = conn.quiz.getCurrentQuestion(m.chat);
    if (nextQuestion) {
      await sendQuestion(conn, m.chat, nextQuestion);
    } else {
      const results = conn.quiz.endSession(m.chat);
      await sendResults(conn, m.chat, results, m.sender);
    }
  }
}

// ========== HELPER FUNCTIONS ==========

async function sendQuestion(conn, chatId, question) {
  // Clear any existing timer
  if (question.timer) clearTimeout(question.timer);

  const questionText = `
📝 *Question ${question.number}/${question.totalQuestions}*
🧠 ${question.category || "General Knowledge"}

${question.text}

${question.options.map((opt, i) => `${i+1}. ${opt}`).join('\n')}

⏱️ You have ${question.timeLimit} seconds to answer.
`.trim();

  await conn.sendMessage(chatId, { 
    text: questionText,
    footer: "Reply with the number (1-4) of your answer",
    mentions: conn.parseMention(questionText)
  });

  // Set timeout for question with error handling
  question.timer = setTimeout(async () => {
    if (conn.quiz?.isActive(chatId)) {
      try {
        await conn.sendMessage(chatId, {
          text: `⏰ Time's up! The correct answer was: ${question.correctAnswer + 1}. ${question.options[question.correctAnswer]}`,
          mentions: []
        });
        
        const nextQuestion = conn.quiz.getCurrentQuestion(chatId);
        if (nextQuestion) {
          await sendQuestion(conn, chatId, nextQuestion);
        } else {
          const results = conn.quiz.endSession(chatId);
          await sendResults(conn, chatId, results);
        }
      } catch (err) {
        console.error("Question timeout error:", err);
      }
    }
  }, (question.timeLimit || 30) * 1000);
}

async function sendResults(conn, chatId, results, userId) {
  const resultText = `
🎉 *Quiz Completed!* 🎉

📊 *Your Results:*
✅ Correct: ${results.correct}
❌ Incorrect: ${results.incorrect}
⚡ Average Time: ${results.avgTime.toFixed(1)}s
🏆 Total Score: ${results.score} points
🔥 Streak: ${results.streak || 0} correct in a row

${getPerformanceComment(results.score / results.total)}
`.trim();

  await conn.sendMessage(chatId, { 
    text: resultText,
    footer: `Type 'quiz start' to play again!`,
    mentions: userId ? [userId] : []
  });
}

async function sendScoreCard(conn, chatId, scores, userId) {
  if (!scores?.length) {
    return await conn.sendMessage(chatId, {
      text: "📭 You haven't completed any quizzes yet. Type 'quiz start' to begin!",
      mentions: [userId]
    });
  }

  const totalQuizzes = scores.length;
  const totalCorrect = scores.reduce((sum, s) => sum + s.correct, );
  const totalQuestions = scores.reduce((sum, s) => sum + s.total, );
  const accuracy = (totalCorrect / totalQuestions * 100).toFixed(1);

  let scoreText = `
🏆 *Your Quiz History*
📊 ${totalQuizzes} quizzes completed
🎯 ${accuracy}% accuracy
✨ Highest score: ${Math.max(...scores.map(s => s.score))} points

📅 *Recent Quizzes:*
${scores.slice(0, 3).map(s => 
  `▢ ${s.date}: ${s.score} pts (${s.correct}/${s.total})`
).join('\n')}
`.trim();

  await conn.sendMessage(chatId, {
    text: scoreText,
    footer: "Type 'quiz start' for a new challenge!",
    mentions: [userId]
  });
}

async function sendLeaderboard(conn, chatId, topPlayers) {
  if (!topPlayers?.length) {
    return await conn.sendMessage(chatId, {
      text: "🏆 No quiz results yet. Be the first to play!",
    });
  }

  const leaderboardText = `
🏆 *Quiz Leaderboard* 🏆

${topPlayers.map((player, i) => 
  `${i+1}. ${player.name || player.id} - ${player.score} points (${player.correctAnswers} correct)`
).join('\n')}

🏅 *Top Performer:* ${topPlayers[0].name || topPlayers[0].id}
`.trim();

  await conn.sendMessage(chatId, {
    text: leaderboardText,
    footer: "Type 'quiz start' to join the competition!"
  });
}

// ========== UTILITY FUNCTIONS ==========

function getPerformanceComment(accuracy) {
  if (accuracy >= 0.9) return "🌟 *Quiz Master!* You're amazing!";
  if (accuracy >= 0.7) return "🎯 *Great job!* You know your stuff!";
  if (accuracy >= 0.5) return "👍 *Good effort!* Keep learning!";
  return "💪 *Keep practicing!* You'll improve!";
}

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

handler.help = ["quiz [start|stop|score|leaderboard|help]"];
handler.tags = ["game", "education"];
handler.command = /^quiz$/i;

export default handler;