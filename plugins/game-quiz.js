import axios from "axios";
import { Quiz } from "../lib/quiz.js"; // Assuming you have a Quiz class

let handler = async (m, { conn, text, botname, usedPrefix }) => {
  // Initialize quiz if not already active
  if (!conn.quiz) {
    conn.quiz = new Quiz();
  }

  // Help menu
  if (!text || text === 'help') {
    return m.reply(`*${botname} Quiz Bot*\n\n`
      + `⚡ *Commands:*\n`
      + `▢ ${usedPrefix}quiz start - Begin a new quiz\n`
      + `▢ ${usedPrefix}quiz stop - End current quiz\n`
      + `▢ ${usedPrefix}quiz score - Check your scores\n\n`
      + `During a quiz, simply type the number (1-4) of your answer choice.`);
  }

  const args = text.trim().split(' ');
  const command = args[0].toLowerCase();

  try {
    switch (command) {
      case 'start':
        if (conn.quiz.isActive(m.chat)) {
          return m.reply("❌ There's already an active quiz in this chat!");
        }

        await m.reply("🔄 *Preparing quiz questions... Please wait...*");
        
        // Fetch questions from API or local storage
        const questions = await conn.quiz.loadQuestions();
        
        if (!questions || questions.length === 0) {
          return m.reply("❌ No questions available. Please try again later.");
        }

        // Start quiz session
        conn.quiz.startSession(m.chat, questions);
        
        // Send first question
        const firstQuestion = conn.quiz.getCurrentQuestion(m.chat);
        await sendQuestion(conn, m.chat, firstQuestion);
        break;

      case 'stop':
        if (!conn.quiz.isActive(m.chat)) {
          return m.reply("❌ No active quiz to stop!");
        }

        const results = conn.quiz.endSession(m.chat);
        await sendResults(conn, m.chat, results);
        break;

      case 'score':
        const userScores = await conn.quiz.getUserScores(m.sender);
        await sendScoreCard(conn, m.chat, userScores, m.sender);
        break;

      default:
        // Handle quiz answers (1-4)
        if (conn.quiz.isActive(m.chat)) {
          const answer = parseInt(text);
          if (isNaN(answer) || answer < 1 || answer > 4) {
            return m.reply("❌ Please answer with a number between 1-4!");
          }

          const response = conn.quiz.submitAnswer(m.chat, m.sender, answer - 1);
          
          if (response.correct !== undefined) {
            await m.reply(response.correct ? "✅ Correct!" : "❌ Incorrect!");
            
            if (response.explanation) {
              await m.reply(`💡 Explanation: ${response.explanation}`);
            }

            const nextQuestion = conn.quiz.getCurrentQuestion(m.chat);
            if (nextQuestion) {
              await sendQuestion(conn, m.chat, nextQuestion);
            } else {
              const results = conn.quiz.endSession(m.chat);
              await sendResults(conn, m.chat, results);
            }
          }
        } else {
          m.reply("ℹ️ Type 'quiz start' to begin a new quiz!");
        }
    }
  } catch (error) {
    console.error("Quiz error:", error);
    m.reply("❌ Quiz operation failed\n" + error.message);
  }
};

// Helper function to send quiz question
async function sendQuestion(conn, chatId, question) {
  let questionText = `📝 *Question ${question.number}:*\n\n`
    + `${question.text}\n\n`;

  question.options.forEach((opt, i) => {
    questionText += `${i + 1}. ${opt}\n`;
  });

  questionText += `\nYou have ${question.timeLimit} seconds to answer.`;

  await conn.sendMessage(chatId, { 
    text: questionText,
    footer: "Reply with the number (1-4) of your answer"
  });

  // Set timeout for question
  question.timer = setTimeout(async () => {
    if (conn.quiz.isActive(chatId)) {
      await conn.sendMessage(chatId, {
        text: `⏰ Time's up! The correct answer was: ${question.correctAnswer + 1}. ${question.options[question.correctAnswer]}`
      });
      
      const nextQuestion = conn.quiz.getCurrentQuestion(chatId);
      if (nextQuestion) {
        await sendQuestion(conn, chatId, nextQuestion);
      } else {
        const results = conn.quiz.endSession(chatId);
        await sendResults(conn, chatId, results);
      }
    }
  }, question.timeLimit * 1000);
}

// Helper function to send results
async function sendResults(conn, chatId, results) {
  let resultText = `📊 *Quiz Results*\n\n`
    + `✅ Correct: ${results.correct}\n`
    + `❌ Incorrect: ${results.incorrect}\n`
    + `⏱ Average Time: ${results.avgTime.toFixed(1)}s\n`
    + `🏆 Score: ${results.score}/${results.total}\n\n`
    + `Type 'quiz start' to play again!`;

  await conn.sendMessage(chatId, { 
    text: resultText,
    footer: `Powered by ${botname}`
  });
}

// Helper function to send score card
async function sendScoreCard(conn, chatId, scores, userId) {
  if (!scores || scores.length === 0) {
    return conn.sendMessage(chatId, {
      text: "You haven't completed any quizzes yet. Type 'quiz start' to begin!"
    });
  }

  let scoreText = `🏆 *Your Quiz Scores*\n\n`;
  
  scores.forEach((score, i) => {
    scoreText += `📅 ${score.date}\n`
      + `▢ Score: ${score.correct}/${score.total}\n`
      + `▢ Time: ${score.timeTaken}s\n\n`;
  });

  await conn.sendMessage(chatId, {
    text: scoreText,
    footer: `Your best score: ${Math.max(...scores.map(s => s.correct))}/${scores[0].total}`
  });
}

handler.help = ["quiz [start/stop/score]"];
handler.tags = ["game"];
handler.command = /^quiz$/i;

export default handler;