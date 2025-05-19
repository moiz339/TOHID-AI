// lib/quiz.js
export class Quiz {
  constructor() {
    this.sessions = {}; // Active quiz sessions by chat ID
    this.userData = {}; // User scores and statistics
    this.questions = this.loadDefaultQuestions(); // Load default questions
  }

  // ========== SESSION MANAGEMENT ==========

  startSession(chatId, questions) {
    if (this.sessions[chatId]) return false;

    this.sessions[chatId] = {
      questions: [...questions],
      currentIndex: 0,
      startTime: Date.now(),
      participants: {},
      questionTimers: {}
    };

    return true;
  }

  endSession(chatId) {
    const session = this.sessions[chatId];
    if (!session) return null;

    // Clear any pending timers
    if (session.questionTimers) {
      Object.values(session.questionTimers).forEach(timer => clearTimeout(timer));
    }

    // Calculate results
    const results = {
      totalQuestions: session.questions.length,
      participants: Object.keys(session.participants).length,
      scores: Object.entries(session.participants).map(([userId, data]) => ({
        userId,
        score: data.score,
        correct: data.correct,
        incorrect: data.incorrect,
        streak: data.streak
      })),
      leaderboard: Object.entries(session.participants)
        .sort((a, b) => b[1].score - a[1].score)
        .slice(0, 3)
    };

    // Save user data
    this.saveSessionResults(chatId, session);

    delete this.sessions[chatId];
    return results;
  }

  isActive(chatId) {
    return !!this.sessions[chatId];
  }

  // ========== QUESTION HANDLING ==========

  getCurrentQuestion(chatId) {
    const session = this.sessions[chatId];
    if (!session || session.currentIndex >= session.questions.length) return null;

    const question = session.questions[session.currentIndex];
    return {
      ...question,
      number: session.currentIndex + 1,
      totalQuestions: session.questions.length,
      timeLimit: question.timeLimit || 30
    };
  }

  submitAnswer(chatId, userId, answerIndex, timestamp) {
    const session = this.sessions[chatId];
    if (!session) return { error: "No active quiz" };

    const question = this.getCurrentQuestion(chatId);
    if (!question) return { error: "No current question" };

    // Initialize participant data if needed
    if (!session.participants[userId]) {
      session.participants[userId] = {
        score: 0,
        correct: 0,
        incorrect: 0,
        streak: 0,
        responseTimes: []
      };
    }

    const participant = session.participants[userId];
    const isCorrect = answerIndex === question.correctAnswer;
    const responseTime = (timestamp - question.startTime) / 1000;

    // Calculate points
    let pointsEarned = 0;
    if (isCorrect) {
      // Base points
      pointsEarned = 10;
      
      // Speed bonus (up to 5 points for answering quickly)
      const speedBonus = Math.max(0, 5 - Math.floor(responseTime / 2));
      pointsEarned += speedBonus;
      
      // Streak bonus (2 points per consecutive correct answer)
      const streakBonus = participant.streak * 2;
      pointsEarned += streakBonus;
      
      participant.correct++;
      participant.streak++;
    } else {
      participant.incorrect++;
      participant.streak = 0;
    }

    participant.score += pointsEarned;
    participant.responseTimes.push(responseTime);

    // Move to next question
    session.currentIndex++;

    return {
      correct: isCorrect,
      correctAnswer: question.correctAnswer,
      pointsEarned,
      explanation: question.explanation
    };
  }

  // ========== USER DATA & STATISTICS ==========

  saveSessionResults(chatId, session) {
    const date = new Date().toISOString().split('T')[0];
    
    Object.entries(session.participants).forEach(([userId, data]) => {
      if (!this.userData[userId]) {
        this.userData[userId] = {
          totalScore: 0,
          totalCorrect: 0,
          totalIncorrect: 0,
          quizzesTaken: 0,
          history: []
        };
      }

      const user = this.userData[userId];
      user.totalScore += data.score;
      user.totalCorrect += data.correct;
      user.totalIncorrect += data.incorrect;
      user.quizzesTaken++;
      
      user.history.push({
        date,
        score: data.score,
        correct: data.correct,
        incorrect: data.incorrect,
        total: session.questions.length,
        chatId
      });
      
      // Keep only last 10 history items
      if (user.history.length > 10) {
        user.history.shift();
      }
    });
  }

  getUserScores(userId) {
    return this.userData[userId]?.history || [];
  }

  getLeaderboard(limit = 5) {
    return Object.entries(this.userData)
      .map(([userId, data]) => ({
        id: userId,
        name: null, // Could be enhanced with user name lookup
        score: data.totalScore,
        correctAnswers: data.totalCorrect,
        quizzesTaken: data.quizzesTaken
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  // ========== QUESTION DATABASE ==========

  loadDefaultQuestions() {
    return [
      // Science (10 questions)
      {
        category: "Science",
        text: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation: "Gold's symbol Au comes from the Latin word 'aurum' meaning shining dawn."
      },
      {
        category: "Science",
        text: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1,
        explanation: "Mars appears red due to iron oxide (rust) on its surface."
      },
      {
        category: "Science",
        text: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswer: 2,
        explanation: "Diamond scores 10 on the Mohs hardness scale, the highest possible."
      },
      {
        category: "Science",
        text: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correctAnswer: 2,
        explanation: "Plants use CO2 for photosynthesis, releasing oxygen as a byproduct."
      },
      {
        category: "Science",
        text: "What is the main component of the Sun?",
        options: ["Liquid lava", "Hydrogen gas", "Oxygen plasma", "Helium solid"],
        correctAnswer: 1,
        explanation: "The Sun is about 70% hydrogen and 28% helium by mass."
      },
      {
        category: "Science",
        text: "Which blood type is known as the universal donor?",
        options: ["A", "B", "AB", "O"],
        correctAnswer: 3,
        explanation: "Type O-negative blood can be donated to persons of any blood type."
      },
      {
        category: "Science",
        text: "What is the unit of electrical resistance?",
        options: ["Volt", "Ampere", "Ohm", "Watt"],
        correctAnswer: 2,
        explanation: "Named after German physicist Georg Simon Ohm."
      },
      {
        category: "Science",
        text: "Which part of the plant conducts photosynthesis?",
        options: ["Root", "Stem", "Leaf", "Flower"],
        correctAnswer: 2,
        explanation: "Leaves contain chlorophyll which captures sunlight for photosynthesis."
      },
      {
        category: "Science",
        text: "What is the pH value of pure water?",
        options: ["1", "7", "10", "14"],
        correctAnswer: 1,
        explanation: "pH 7 is neutral, with values below being acidic and above alkaline."
      },
      {
        category: "Science",
        text: "Which scientist proposed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correctAnswer: 1,
        explanation: "Einstein published his special theory of relativity in 1905."
      },

      // Geography (10 questions)
      {
        category: "Geography",
        text: "Which is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: 3,
        explanation: "The Pacific Ocean covers about 63 million square miles."
      },
      {
        category: "Geography",
        text: "What is the capital of Canada?",
        options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
        correctAnswer: 2,
        explanation: "Ottawa was chosen as capital in 1857 by Queen Victoria."
      },
      {
        category: "Geography",
        text: "Which desert is the largest in the world?",
        options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
        correctAnswer: 3,
        explanation: "Antarctica is technically a desert with less than 200mm annual precipitation."
      },
      {
        category: "Geography",
        text: "Mount Everest is located in which mountain range?",
        options: ["Andes", "Himalayas", "Rockies", "Alps"],
        correctAnswer: 1,
        explanation: "The Himalayas span five countries including Nepal and China."
      },
      {
        category: "Geography",
        text: "Which country has the most natural lakes?",
        options: ["USA", "Canada", "Russia", "Finland"],
        correctAnswer: 1,
        explanation: "Canada has over 2 million lakes covering about 7.6% of its land area."
      },
      {
        category: "Geography",
        text: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        correctAnswer: 0,
        explanation: "The Nile is approximately 6,650 km (4,130 mi) long."
      },
      {
        category: "Geography",
        text: "Which continent contains the most countries?",
        options: ["Asia", "Africa", "Europe", "South America"],
        correctAnswer: 1,
        explanation: "Africa has 54 recognized sovereign states."
      },
      {
        category: "Geography",
        text: "What is the smallest country in the world?",
        options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
        correctAnswer: 1,
        explanation: "Vatican City is only 0.44 km² and home to the Pope."
      },
      {
        category: "Geography",
        text: "Which country is both in Europe and Asia?",
        options: ["Turkey", "Egypt", "Greece", "Russia"],
        correctAnswer: 3,
        explanation: "Russia spans both continents, with most population in Europe."
      },
      {
        category: "Geography",
        text: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        correctAnswer: 2,
        explanation: "Canberra was specially built as capital between Sydney and Melbourne."

      // History (10 questions)
      },
      {
        category: "History",
        text: "In which year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: 1,
        explanation: "WWII ended in 1945 with Japan's surrender on September 2."
      },
      {
        category: "History",
        text: "Who was the first president of the United States?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: 2,
        explanation: "Washington served from 1789 to 1797 after leading the Continental Army."
      },
      {
        category: "History",
        text: "Which ancient civilization built the Machu Picchu complex?",
        options: ["Aztec", "Maya", "Inca", "Olmec"],
        correctAnswer: 2,
        explanation: "The Incas built Machu Picchu in the 15th century in Peru."
      },
      {
        category: "History",
        text: "The Industrial Revolution began in which country?",
        options: ["France", "Germany", "United States", "Great Britain"],
        correctAnswer: 3,
        explanation: "Started in Britain in the late 18th century with textile industry mechanization."
      },
      {
        category: "History",
        text: "Who invented the telephone?",
        options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
        correctAnswer: 1,
        explanation: "Bell received the first US patent for the telephone in 1876."
      },
      {
        category: "History",
        text: "Which empire was ruled by Julius Caesar?",
        options: ["Greek", "Roman", "Egyptian", "Persian"],
        correctAnswer: 1,
        explanation: "Caesar was a Roman general and statesman who played a critical role in Rome's transition from republic to empire."
      },
      {
        category: "History",
        text: "The Magna Carta was signed in which century?",
        options: ["11th", "12th", "13th", "14th"],
        correctAnswer: 2,
        explanation: "Signed in 1215 by King John of England, it established the principle that everyone is subject to the law."
      },
      {
        category: "History",
        text: "Who was the first woman to win a Nobel Prize?",
        options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Florence Nightingale"],
        correctAnswer: 0,
        explanation: "Marie Curie won the 1903 Nobel Prize in Physics and the 1911 Nobel Prize in Chemistry."
      },
      {
        category: "History",
        text: "Which year did the Berlin Wall fall?",
        options: ["1987", "1989", "1991", "1993"],
        correctAnswer: 1,
        explanation: "The Berlin Wall fell on November 9, 1989, leading to German reunification."
      },
      {
        category: "History",
        text: "The Renaissance began in which country?",
        options: ["France", "Germany", "Italy", "Spain"],
        correctAnswer: 2,
        explanation: "The Renaissance began in Florence, Italy in the 14th century as a cultural movement."

      // Arts & Literature (10 questions)
      },
      {
        category: "Arts",
        text: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2,
        explanation: "Da Vinci painted the Mona Lisa between 1503-1519, now in the Louvre."
      },
      {
        category: "Arts",
        text: "Which Shakespeare play features the characters Romeo and Juliet?",
        options: ["Macbeth", "Hamlet", "Romeo and Juliet", "Othello"],
        correctAnswer: 2,
        explanation: "The tragic love story was written between 1591-1595."
      },
      {
        category: "Arts",
        text: "What is the primary color in the RGB color model?",
        options: ["Red, Green, Blue", "Red, Yellow, Blue", "Cyan, Magenta, Yellow", "Hue, Saturation, Brightness"],
        correctAnswer: 0,
        explanation: "RGB is an additive color model used for electronic displays."
      },
      {
        category: "Arts",
        text: "Who wrote 'To Kill a Mockingbird'?",
        options: ["J.D. Salinger", "Harper Lee", "Mark Twain", "Ernest Hemingway"],
        correctAnswer: 1,
        explanation: "Harper Lee published the novel in 1960, winning the Pulitzer Prize."
      },
      {
        category: "Arts",
        text: "Which composer wrote the 'Moonlight Sonata'?",
        options: ["Mozart", "Beethoven", "Bach", "Chopin"],
        correctAnswer: 1,
        explanation: "Beethoven completed this piano sonata in 1801."
      },
      {
        category: "Arts",
        text: "In which museum would you find Van Gogh's 'Starry Night'?",
        options: ["Louvre", "Metropolitan Museum of Art", "Rijksmuseum", "Museum of Modern Art"],
        correctAnswer: 3,
        explanation: "The MoMA in New York has housed the painting since 1941."
      },
      {
        category: "Arts",
        text: "Which literary character lived at 221B Baker Street?",
        options: ["James Bond", "Sherlock Holmes", "Harry Potter", "Dracula"],
        correctAnswer: 1,
        explanation: "Sherlock Holmes, created by Arthur Conan Doyle, lived at this London address."
      },
      {
        category: "Arts",
        text: "What is the name of the famous sculpture by Michelangelo depicting a biblical hero?",
        options: ["The Thinker", "David", "Pieta", "Moses"],
        correctAnswer: 1,
        explanation: "The marble statue of David was completed in 1504 and stands over 17 feet tall."
      },
      {
        category: "Arts",
        text: "Which artist is known for his 'Campbell's Soup Cans' artwork?",
        options: ["Andy Warhol", "Jackson Pollock", "Roy Lichtenstein", "Salvador Dali"],
        correctAnswer: 0,
        explanation: "Warhol created this iconic pop art piece in 1962."
      },
      {
        category: "Arts",
        text: "Who wrote the play 'A Streetcar Named Desire'?",
        options: ["Arthur Miller", "Tennessee Williams", "Eugene O'Neill", "Samuel Beckett"],
        correctAnswer: 1,
        explanation: "Tennessee Williams' play won the Pulitzer Prize for Drama in 1948."

      // General Knowledge (10 questions)
      },
      {
        category: "General",
        text: "How many continents are there on Earth?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "The seven continents are Africa, Antarctica, Asia, Europe, North America, South America, and Australia."
      },
      {
        category: "General",
        text: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1,
        explanation: "Blue whales can reach up to 100 feet long and weigh over 200 tons."
      },
      {
        category: "General",
        text: "Which planet is closest to the Sun?",
        options: ["Venus", "Earth", "Mercury", "Mars"],
        correctAnswer: 2,
        explanation: "Mercury's average distance from the Sun is about 36 million miles."
      },
      {
        category: "General",
        text: "How many colors are in a rainbow?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 2,
        explanation: "The colors are red, orange, yellow, green, blue, indigo, and violet (ROYGBIV)."
      },
      {
        category: "General",
        text: "What is the most widely spoken language in the world?",
        options: ["English", "Mandarin Chinese", "Spanish", "Hindi"],
        correctAnswer: 1,
        explanation: "Mandarin has about 1.1 billion native speakers, mostly in China."
      },
      {
        category: "General",
        text: "Which country invented tea?",
        options: ["India", "Japan", "China", "England"],
        correctAnswer: 2,
        explanation: "Tea drinking originated in China as early as the Shang dynasty (1500 BC)."
      },
      {
        category: "General",
        text: "How many bones are in the adult human body?",
        options: ["206", "300", "150", "500"],
        correctAnswer: 0,
        explanation: "Babies are born with about 300 bones, many of which fuse together."
      },
      {
        category: "General",
        text: "What is the capital of Japan?",
        options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
        correctAnswer: 2,
        explanation: "Tokyo has been Japan's capital since 1868 and is the world's most populous metropolitan area."
      },
      {
        category: "General",
        text: "Which sport is known as 'the beautiful game'?",
        options: ["Basketball", "Soccer", "Tennis", "Cricket"],
        correctAnswer: 1,
        explanation: "Soccer (football) is called 'o jogo bonito' in Portuguese, popularized by Pelé."
      },
      {
        category: "General",
        text: "What is the tallest mountain in Africa?",
        options: ["Mount Kenya", "Mount Kilimanjaro", "Mount Stanley", "Mount Meru"],
        correctAnswer: 1,
        explanation: "Kilimanjaro in Tanzania rises about 5,895 meters (19,341 feet) above sea level."
      }
    ];
  }

  // Could be enhanced with API calls to fetch more questions
  async loadQuestions() {
    // In a real implementation, might fetch from an API like:
    // const response = await axios.get('https://opentdb.com/api.php?amount=10');
    // return formatApiQuestions(response.data.results);
    
    // For now, use our default questions
    return this.loadDefaultQuestions();
  }
}