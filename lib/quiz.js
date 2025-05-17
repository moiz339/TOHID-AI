export class Quiz {
  constructor() {
    this.sessions = new Map();
    this.scores = new Map();
  }

  isActive(chatId) {
    return this.sessions.has(chatId);
  }

  async loadQuestions() {
    try {
      // Try to fetch from API first
      const { data } = await axios.get('https://quiz-api.example.com/questions');
      return data.questions;
    } catch (e) {
      // Fallback to local questions
      return [
        {
    id: 1,
    text: "What is the capital of France?",
    options: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 1,
    explanation: "Paris has been the capital of France since the 5th century.",
    timeLimit: 30
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1,
    explanation: "Mars appears red due to iron oxide (rust) on its surface.",
    timeLimit: 30
  },
  {
    id: 3,
    text: "What is the largest mammal in the world?",
    options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
    correctAnswer: 1,
    explanation: "The blue whale can reach lengths of up to 100 feet and weights of 200 tons.",
    timeLimit: 30
  },
  {
    id: 4,
    text: "Which language is primarily used for web development?",
    options: ["Java", "Python", "JavaScript", "C++"],
    correctAnswer: 2,
    explanation: "JavaScript is the primary language for client-side web development.",
    timeLimit: 30
  },
  {
    id: 5,
    text: "What year did World War II end?",
    options: ["1943", "1945", "1947", "1950"],
    correctAnswer: 1,
    explanation: "World War II ended in 1945 with the surrender of Germany and Japan.",
    timeLimit: 30
  },
  {
    id: 6,
    text: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: 2,
    explanation: "Leonardo da Vinci painted the Mona Lisa in the early 16th century.",
    timeLimit: 30
  },
  {
    id: 7,
    text: "What is the chemical symbol for gold?",
    options: ["Go", "Gd", "Au", "Ag"],
    correctAnswer: 2,
    explanation: "Au comes from the Latin word for gold, 'aurum'.",
    timeLimit: 30
  },
  {
    id: 8,
    text: "Which country is home to the kangaroo?",
    options: ["South Africa", "Brazil", "Australia", "New Zealand"],
    correctAnswer: 2,
    explanation: "Kangaroos are marsupials native to Australia.",
    timeLimit: 30
  },
  {
    id: 9,
    text: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: 3,
    explanation: "The Pacific Ocean covers about 63 million square miles.",
    timeLimit: 30
  },
  {
    id: 10,
    text: "Who wrote 'Romeo and Juliet'?",
    options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correctAnswer: 1,
    explanation: "William Shakespeare wrote this famous tragedy in the late 16th century.",
    timeLimit: 30
  },
  // Continuing with 190 more questions...
  {
    id: 11,
    text: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: 2,
    explanation: "Diamond is the hardest known natural material on the Mohs scale.",
    timeLimit: 30
  },
  {
    id: 12,
    text: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: 2,
    explanation: "Plants use CO2 for photosynthesis, releasing oxygen as a byproduct.",
    timeLimit: 30
  },
  {
    id: 13,
    text: "What is the capital of Japan?",
    options: ["Beijing", "Seoul", "Tokyo", "Bangkok"],
    correctAnswer: 2,
    explanation: "Tokyo has been Japan's capital since 1868.",
    timeLimit: 30
  },
  {
    id: 14,
    text: "How many continents are there on Earth?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "The seven continents are Africa, Antarctica, Asia, Europe, North America, Australia, and South America.",
    timeLimit: 30
  },
  {
    id: 15,
    text: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    correctAnswer: 2,
    explanation: "Mercury is the smallest and innermost planet in the Solar System.",
    timeLimit: 30
  },
  {
    id: 16,
    text: "What is the largest organ in the human body?",
    options: ["Liver", "Brain", "Skin", "Heart"],
    correctAnswer: 2,
    explanation: "The skin accounts for about 15% of body weight.",
    timeLimit: 30
  },
  {
    id: 17,
    text: "Which country invented tea?",
    options: ["India", "England", "China", "Japan"],
    correctAnswer: 2,
    explanation: "Tea originated in southwest China as a medicinal drink.",
    timeLimit: 30
  },
  {
    id: 18,
    text: "How many bones are in the adult human body?",
    options: ["206", "300", "150", "412"],
    correctAnswer: 0,
    explanation: "Babies are born with about 300 bones that fuse together to form 206 bones in adults.",
    timeLimit: 30
  },
  {
    id: 19,
    text: "What is the currency of the United Kingdom?",
    options: ["Euro", "Dollar", "Pound", "Yen"],
    correctAnswer: 2,
    explanation: "The British pound sterling is the world's oldest currency still in use.",
    timeLimit: 30
  },
  {
    id: 20,
    text: "Which animal is known as the 'King of the Jungle'?",
    options: ["Tiger", "Elephant", "Lion", "Gorilla"],
    correctAnswer: 2,
    explanation: "Lions are called kings of the jungle though they primarily live in grasslands.",
    timeLimit: 30
  },
  // Continuing with 180 more questions...
  {
    id: 21,
    text: "What is the largest desert in the world?",
    options: ["Sahara", "Arabian", "Gobi", "Antarctic"],
    correctAnswer: 3,
    explanation: "Antarctica is the largest desert, classified as such due to low precipitation.",
    timeLimit: 30
  },
  {
    id: 22,
    text: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Osmium", "Oxygen", "Oganesson"],
    correctAnswer: 2,
    explanation: "Oxygen is essential for respiration and makes up about 21% of Earth's atmosphere.",
    timeLimit: 30
  },
  {
    id: 23,
    text: "Who developed the theory of relativity?",
    options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
    correctAnswer: 1,
    explanation: "Einstein published his special theory of relativity in 1905.",
    timeLimit: 30
  },
  {
    id: 24,
    text: "What is the capital of Canada?",
    options: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: 2,
    explanation: "Ottawa was chosen as Canada's capital in 1857 by Queen Victoria.",
    timeLimit: 30
  },
  {
    id: 25,
    text: "Which country is the largest by area?",
    options: ["China", "United States", "Canada", "Russia"],
    correctAnswer: 3,
    explanation: "Russia covers about 1/8th of Earth's inhabited land area.",
    timeLimit: 30
  },
  {
    id: 26,
    text: "How many colors are in a rainbow?",
    options: ["5", "6", "7", "8"],
    correctAnswer: 2,
    explanation: "The colors are red, orange, yellow, green, blue, indigo, and violet.",
    timeLimit: 30
  },
  {
    id: 27,
    text: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    correctAnswer: 1,
    explanation: "Mount Everest's peak is 8,848 meters above sea level.",
    timeLimit: 30
  },
  {
    id: 28,
    text: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: 1,
    explanation: "As of 2023, Saturn has 146 confirmed moons.",
    timeLimit: 30
  },
  {
    id: 29,
    text: "What is the smallest country in the world?",
    options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"],
    correctAnswer: 1,
    explanation: "Vatican City covers just 0.49 square kilometers.",
    timeLimit: 30
  },
  {
    id: 30,
    text: "Which language has the most native speakers?",
    options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
    correctAnswer: 3,
    explanation: "Mandarin Chinese has about 1.1 billion native speakers.",
    timeLimit: 30
  },
  {
  id: 31,
  text: "What does 'HTTP' stand for in web addresses?",
  options: ["HyperText Transfer Protocol", "High-Tech Text Process", "Hyperlink Text Type", "Home Tool Transfer Protocol"],
  correctAnswer: 0,
  explanation: "HTTP is the foundation of data communication for the World Wide Web.",
  timeLimit: 30
},
{
  id: 32,
  text: "Which company developed the Python programming language?",
  options: ["Microsoft", "Google", "Guido van Rossum", "Oracle"],
  correctAnswer: 2,
  explanation: "Guido van Rossum created Python in 1991 while at CWI in the Netherlands.",
  timeLimit: 25
},
{
  id: 33,
  text: "What is the main component of the Sun?",
  options: ["Liquid Lava", "Hydrogen Gas", "Molten Iron", "Plasma"],
  correctAnswer: 1,
  explanation: "The Sun is about 70% hydrogen and 28% helium by mass.",
  timeLimit: 30
},
{
  id: 34,
  text: "Which planet has the Great Red Spot?",
  options: ["Mars", "Jupiter", "Saturn", "Neptune"],
  correctAnswer: 1,
  explanation: "Jupiter's Great Red Spot is a giant storm larger than Earth.",
  timeLimit: 25
},
{
  id: 35,
  text: "What does 'AI' stand for in technology?",
  options: ["Automated Interface", "Artificial Intelligence", "Advanced Internet", "Algorithmic Integration"],
  correctAnswer: 1,
  explanation: "AI refers to machines designed to perform tasks that typically require human intelligence.",
  timeLimit: 20
},
{
  id: 36,
  text: "Which element has the atomic number 1?",
  options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
  correctAnswer: 1,
  explanation: "Hydrogen is the lightest and most abundant element in the universe.",
  timeLimit: 25
},
{
  id: 37,
  text: "What year was the first iPhone released?",
  options: ["2005", "2007", "2010", "2003"],
  correctAnswer: 1,
  explanation: "Steve Jobs unveiled the first iPhone on January 9, 2007.",
  timeLimit: 30
},
{
  id: 38,
  text: "Which scientist discovered penicillin?",
  options: ["Marie Curie", "Alexander Fleming", "Isaac Newton", "Albert Einstein"],
  correctAnswer: 1,
  explanation: "Fleming discovered penicillin in 1928, revolutionizing medicine.",
  timeLimit: 30
},
{
  id: 39,
  text: "What is the standard voltage for household outlets in the US?",
  options: ["120V", "220V", "240V", "110V"],
  correctAnswer: 0,
  explanation: "Most US outlets provide 120V at 60Hz frequency.",
  timeLimit: 25
},
{
  id: 40,
  text: "Which company created the Windows operating system?",
  options: ["Apple", "Microsoft", "IBM", "Google"],
  correctAnswer: 1,
  explanation: "Microsoft released Windows 1.0 in 1985.",
  timeLimit: 20
},
{
  id: 41,
  text: "What does 'GPU' stand for?",
  options: ["Graphical Processing Unit", "General Processing Unit", "Graphics Performance Unit", "Global Processing Unit"],
  correctAnswer: 0,
  explanation: "GPUs are specialized for parallel processing of graphics data.",
  timeLimit: 25
},
{
  id: 42,
  text: "Which gas makes up about 78% of Earth's atmosphere?",
  options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
  correctAnswer: 2,
  explanation: "Nitrogen is crucial for all living organisms.",
  timeLimit: 30
},
{
  id: 43,
  text: "What is the fastest land animal?",
  options: ["Cheetah", "Pronghorn Antelope", "Lion", "Greyhound"],
  correctAnswer: 0,
  explanation: "Cheetahs can reach speeds up to 70 mph (113 km/h).",
  timeLimit: 25
},
{
  id: 44,
  text: "Which planet is known for its prominent ring system?",
  options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
  correctAnswer: 1,
  explanation: "Saturn's rings are made mostly of ice particles.",
  timeLimit: 30
},
{
  id: 45,
  text: "What is the largest type of shark?",
  options: ["Great White", "Whale Shark", "Tiger Shark", "Megalodon"],
  correctAnswer: 1,
  explanation: "Whale sharks can grow up to 40 feet (12 meters) long.",
  timeLimit: 25
},
{
  id: 46,
  text: "Which programming language uses 'print()' for output?",
  options: ["Java", "C++", "Python", "JavaScript"],
  correctAnswer: 2,
  explanation: "Python is known for its simple syntax using print().",
  timeLimit: 20
},
{
  id: 47,
  text: "What is the study of fossils called?",
  options: ["Geology", "Paleontology", "Archaeology", "Anthropology"],
  correctAnswer: 1,
  explanation: "Paleontologists study ancient life through fossils.",
  timeLimit: 30
},
{
  id: 48,
  text: "Which planet is closest in size to Earth?",
  options: ["Mars", "Venus", "Mercury", "Neptune"],
  correctAnswer: 1,
  explanation: "Venus is often called Earth's twin due to similar size and mass.",
  timeLimit: 25
},
{
  id: 49,
  text: "What does 'URL' stand for?",
  options: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Resource Link", "Universal Reference Locator"],
  correctAnswer: 1,
  explanation: "URLs specify the location of resources on the internet.",
  timeLimit: 25
},
{
  id: 50,
  text: "Which scientist formulated the laws of motion?",
  options: ["Albert Einstein", "Galileo Galilei", "Isaac Newton", "Nikola Tesla"],
  correctAnswer: 2,
  explanation: "Newton's three laws of motion were published in 1687.",
  timeLimit: 30
},
{
  id: 51,
  text: "In which year did World War I begin?",
  options: ["1912", "1914", "1916", "1918"],
  correctAnswer: 1,
  explanation: "WWI began July 28, 1914 after Archduke Franz Ferdinand's assassination.",
  timeLimit: 30
},
{
  id: 52,
  text: "Which ancient civilization built the Machu Picchu complex?",
  options: ["Aztec", "Maya", "Inca", "Olmec"],
  correctAnswer: 2,
  explanation: "The Incas built Machu Picchu in the 15th century.",
  timeLimit: 30
},
{
  id: 53,
  text: "What is the longest river in the world?",
  options: ["Amazon", "Nile", "Yangtze", "Mississippi"],
  correctAnswer: 1,
  explanation: "The Nile stretches about 6,650 km (4,130 miles).",
  timeLimit: 30
},
{
  id: 54,
  text: "Which country gifted the Statue of Liberty to the US?",
  options: ["England", "Canada", "France", "Spain"],
  correctAnswer: 2,
  explanation: "France gifted the statue in 1886 to commemorate the American Revolution.",
  timeLimit: 25
},
{
  id: 55,
  text: "Who was the first woman to fly solo across the Atlantic?",
  options: ["Amelia Earhart", "Bessie Coleman", "Harriet Quimby", "Jacqueline Cochran"],
  correctAnswer: 0,
  explanation: "Earhart completed this feat in 1932.",
  timeLimit: 30
},
{
  id: 56,
  text: "Which ancient wonder was located in Babylon?",
  options: ["Great Pyramid", "Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria"],
  correctAnswer: 1,
  explanation: "The Hanging Gardens were one of the Seven Wonders of the Ancient World.",
  timeLimit: 30
},
{
  id: 57,
  text: "What was the name of the first permanent English settlement in America?",
  options: ["Plymouth", "Jamestown", "Roanoke", "New Amsterdam"],
  correctAnswer: 1,
  explanation: "Jamestown was established in Virginia in 1607.",
  timeLimit: 30
},
{
  id: 58,
  text: "Which country has the most time zones?",
  options: ["United States", "Russia", "China", "France"],
  correctAnswer: 3,
  explanation: "France has 12 time zones due to its overseas territories.",
  timeLimit: 25
},
{
  id: 59,
  text: "Who was the first president of the United States?",
  options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
  correctAnswer: 2,
  explanation: "Washington served from 1789 to 1797.",
  timeLimit: 25
},
{
  id: 60,
  text: "Which ancient city was destroyed by Mount Vesuvius?",
  options: ["Athens", "Pompeii", "Troy", "Carthage"],
  correctAnswer: 1,
  explanation: "Vesuvius erupted in 79 AD, preserving Pompeii under ash.",
  timeLimit: 30
},
{
  id: 61,
  text: "What is the capital of Australia?",
  options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
  correctAnswer: 2,
  explanation: "Canberra was specially built as Australia's capital in 1913.",
  timeLimit: 25
},
{
  id: 62,
  text: "Which empire was ruled by Genghis Khan?",
  options: ["Ottoman", "Mongol", "Persian", "Roman"],
  correctAnswer: 1,
  explanation: "Genghis Khan founded the Mongol Empire in 1206.",
  timeLimit: 30
},
{
  id: 63,
  text: "What is the oldest continuously inhabited city in the world?",
  options: ["Athens", "Jerusalem", "Damascus", "Varanasi"],
  correctAnswer: 2,
  explanation: "Damascus, Syria has been inhabited since about 10,000 BCE.",
  timeLimit: 30
},
{
  id: 64,
  text: "Which country has the largest population?",
  options: ["India", "China", "United States", "Indonesia"],
  correctAnswer: 1,
  explanation: "China has over 1.4 billion people (though India is catching up).",
  timeLimit: 25
},
{
  id: 65,
  text: "Who invented the telephone?",
  options: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
  correctAnswer: 1,
  explanation: "Bell patented the telephone in 1876.",
  timeLimit: 25
},
{
  id: 66,
  text: "Which war was fought between North and South Korea?",
  options: ["Vietnam War", "Korean War", "Cold War", "World War II"],
  correctAnswer: 1,
  explanation: "The Korean War lasted from 1950-1953.",
  timeLimit: 30
},
{
  id: 67,
  text: "What is the largest country in South America?",
  options: ["Argentina", "Colombia", "Brazil", "Peru"],
  correctAnswer: 2,
  explanation: "Brazil covers 47.3% of South America's land area.",
  timeLimit: 25
},
{
  id: 68,
  text: "Who was the first person to walk on the moon?",
  options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"],
  correctAnswer: 1,
  explanation: "Armstrong stepped onto the moon July 20, 1969.",
  timeLimit: 25
},
{
  id: 69,
  text: "Which civilization built the pyramids of Giza?",
  options: ["Ancient Greeks", "Ancient Egyptians", "Ancient Romans", "Mesopotamians"],
  correctAnswer: 1,
  explanation: "The Great Pyramid was built around 2560 BCE.",
  timeLimit: 30
},
{
  id: 70,
  text: "What is the capital of South Africa?",
  options: ["Johannesburg", "Cape Town", "Pretoria", "All of the above"],
  correctAnswer: 3,
  explanation: "South Africa has three capitals: Pretoria (executive), Cape Town (legislative), and Bloemfontein (judicial).",
  timeLimit: 30
},
{
  id: 71,
  text: "Who painted 'The Starry Night'?",
  options: ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"],
  correctAnswer: 1,
  explanation: "Van Gogh painted this masterpiece in 1889 while in an asylum.",
  timeLimit: 25
},
{
  id: 72,
  text: "Which movie won the first Academy Award for Best Picture?",
  options: ["Gone with the Wind", "Wings", "Sunrise", "The Jazz Singer"],
  correctAnswer: 1,
  explanation: "Wings won at the 1st Academy Awards in 1929.",
  timeLimit: 30
},
{
  id: 73,
  text: "Who wrote 'Romeo and Juliet'?",
  options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
  correctAnswer: 1,
  explanation: "Shakespeare wrote this tragedy between 1591-1595.",
  timeLimit: 25
},
{
  id: 74,
  text: "Which band features Bono as its lead singer?",
  options: ["The Rolling Stones", "U2", "Coldplay", "The Beatles"],
  correctAnswer: 1,
  explanation: "U2 is an Irish rock band formed in 1976.",
  timeLimit: 20
},
{
  id: 75,
  text: "What is the highest-grossing film of all time?",
  options: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"],
  correctAnswer: 0,
  explanation: "Avatar (2009) grossed over $2.8 billion worldwide.",
  timeLimit: 30
},
{
  id: 76,
  text: "Which instrument has 88 keys?",
  options: ["Guitar", "Violin", "Piano", "Harp"],
  correctAnswer: 2,
  explanation: "Standard pianos have 52 white and 36 black keys.",
  timeLimit: 25
},
{
    id: 77,
    text: "Who directed the movie 'Jurassic Park'?",
    options: ["Steven Spielberg", "James Cameron", "George Lucas", "Ridley Scott"],
    correctAnswer: 0,
    explanation: "Spielberg directed this 1993 blockbuster.",
    timeLimit: 25
  },
  {
    id: 78,
    text: "Which artist is known for painting melting clocks?",
    options: ["Pablo Picasso", "Salvador Dalí", "Jackson Pollock", "Andy Warhol"],
    correctAnswer: 1,
    explanation: "Dalí's 'The Persistence of Memory' features iconic melting clocks.",
    timeLimit: 30
  },
  {
    id: 79,
    text: "What is the name of the fictional wizarding school in Harry Potter?",
    options: ["Hogwarts", "Beauxbatons", "Durmstrang", "Ilvermorny"],
    correctAnswer: 0,
    explanation: "Hogwarts School of Witchcraft and Wizardry is in Scotland.",
    timeLimit: 20
  },
  {
    id: 80,
    text: "Which composer wrote 'Für Elise'?",
    options: ["Mozart", "Beethoven", "Bach", "Chopin"],
    correctAnswer: 1,
    explanation: "Beethoven composed this piece around 1810.",
    timeLimit: 25
  },
  {
  id: 81,
  text: "What does 'CPU' stand for?",
  options: ["Central Processing Unit", "Computer Processing Unit", "Core Processing Unit", "Central Power Unit"],
  correctAnswer: 0,
  explanation: "The CPU is the 'brain' of the computer that performs calculations.",
  timeLimit: 25
},
{
  id: 82,
  text: "Which planet has the most extreme seasons due to its axial tilt?",
  options: ["Mars", "Saturn", "Uranus", "Venus"],
  correctAnswer: 2,
  explanation: "Uranus is tilted 98 degrees, causing extreme 21-year-long seasons.",
  timeLimit: 30
},
{
  id: 83,
  text: "What is the rarest blood type in humans?",
  options: ["O-negative", "AB-positive", "AB-negative", "B-negative"],
  correctAnswer: 2,
  explanation: "Only about 1% of the population has AB-negative blood.",
  timeLimit: 30
},
{
  id: 84,
  text: "Which programming language was created by Brendan Eich in just 10 days?",
  options: ["Python", "Java", "JavaScript", "Ruby"],
  correctAnswer: 2,
  explanation: "JavaScript was created in 1995 for Netscape Navigator.",
  timeLimit: 30
},
{
  id: 85,
  text: "What is the only metal that's liquid at room temperature?",
  options: ["Bromine", "Gallium", "Mercury", "Francium"],
  correctAnswer: 2,
  explanation: "Mercury remains liquid between -38°F to 674°F (-39°C to 357°C).",
  timeLimit: 30
},
{
  id: 86,
  text: "Which company developed the first commercially successful GUI operating system?",
  options: ["Microsoft", "Apple", "Xerox", "IBM"],
  correctAnswer: 2,
  explanation: "Xerox PARC developed the GUI in the 1970s, later inspiring Apple and Microsoft.",
  timeLimit: 35
},
{
  id: 87,
  text: "What is the largest moon in our solar system?",
  options: ["Titan", "Ganymede", "Moon", "Europa"],
  correctAnswer: 1,
  explanation: "Jupiter's Ganymede is larger than Mercury and Pluto.",
  timeLimit: 30
},
{
  id: 88,
  text: "Which animal has the longest lifespan?",
  options: ["Galapagos Tortoise", "Bowhead Whale", "Greenland Shark", "Ocean Quahog"],
  correctAnswer: 2,
  explanation: "Greenland sharks can live 300-500 years, with one estimated at 512 years.",
  timeLimit: 35
},
{
  id: 89,
  text: "What does 'HTML' stand for?",
  options: ["HyperText Markup Language", "HighTech Machine Language", "Hyperlink Text Management Layer", "Home Tool Markup Language"],
  correctAnswer: 0,
  explanation: "HTML is the standard markup language for web pages.",
  timeLimit: 25
},
{
  id: 90,
  text: "Which scientist discovered X-rays?",
  options: ["Marie Curie", "Wilhelm Röntgen", "Thomas Edison", "Nikola Tesla"],
  correctAnswer: 1,
  explanation: "Röntgen discovered X-rays in 1895 and won the first Nobel Prize in Physics.",
  timeLimit: 30
},
{
  id: 91,
  text: "What is the fastest animal in water?",
  options: ["Sailfish", "Dolphin", "Swordfish", "Orca"],
  correctAnswer: 0,
  explanation: "Sailfish can reach 68 mph (110 km/h) in short bursts.",
  timeLimit: 30
},
{
  id: 92,
  text: "Which element is essential for computer chips and solar panels?",
  options: ["Gold", "Silicon", "Copper", "Aluminum"],
  correctAnswer: 1,
  explanation: "Silicon is a semiconductor crucial for electronics.",
  timeLimit: 30
},
{
  id: 93,
  text: "What does 'VPN' stand for?",
  options: ["Virtual Private Network", "Verified Public Node", "Virtual Protocol Network", "Verified Private Node"],
  correctAnswer: 0,
  explanation: "VPNs create secure connections over public networks.",
  timeLimit: 25
},
{
  id: 94,
  text: "Which planet rotates on its side?",
  options: ["Venus", "Saturn", "Uranus", "Neptune"],
  correctAnswer: 2,
  explanation: "Uranus rotates at a 98-degree angle from its orbital plane.",
  timeLimit: 30
},
{
  id: 95,
  text: "What is the only bird that can fly backwards?",
  options: ["Eagle", "Hummingbird", "Kingfisher", "Parrot"],
  correctAnswer: 1,
  explanation: "Hummingbirds can hover and fly backwards due to unique wing structure.",
  timeLimit: 25
},
{
  id: 96,
  text: "Which company first introduced the smartphone in 1994?",
  options: ["Apple", "Nokia", "IBM", "BlackBerry"],
  correctAnswer: 2,
  explanation: "IBM Simon (1994) was the first device with touchscreen and apps.",
  timeLimit: 35
},
{
  id: 97,
  text: "What is the hardest substance in the human body?",
  options: ["Bone", "Tooth Enamel", "Cartilage", "Fingernail"],
  correctAnswer: 1,
  explanation: "Tooth enamel is harder than steel but more brittle.",
  timeLimit: 30
},
{
  id: 98,
  text: "Which gas gives Neptune its blue color?",
  options: ["Oxygen", "Methane", "Hydrogen", "Nitrogen"],
  correctAnswer: 1,
  explanation: "Methane absorbs red light, reflecting blue back into space.",
  timeLimit: 30
},
{
  id: 99,
  text: "What is the most abundant element in the universe?",
  options: ["Oxygen", "Carbon", "Hydrogen", "Helium"],
  correctAnswer: 2,
  explanation: "Hydrogen makes up about 75% of all normal matter.",
  timeLimit: 30
},
{
  id: 100,
  text: "Which animal has the largest brain relative to body size?",
  options: ["Elephant", "Dolphin", "Human", "Ant"],
  correctAnswer: 3,
  explanation: "Ants have the largest brain-to-body ratio of any animal.",
  timeLimit: 35
},
{
  id: 101,
  text: "Which ancient civilization invented paper?",
  options: ["Egyptians", "Chinese", "Greeks", "Mayans"],
  correctAnswer: 1,
  explanation: "Chinese court official Cai Lun perfected papermaking around 105 CE.",
  timeLimit: 30
},
{
  id: 102,
  text: "What was the name of the first artificial Earth satellite?",
  options: ["Explorer 1", "Sputnik 1", "Vanguard 1", "Telstar 1"],
  correctAnswer: 1,
  explanation: "The Soviet Union launched Sputnik 1 on October 4, 1957.",
  timeLimit: 30
},
{
  id: 103,
  text: "Which country has the most UNESCO World Heritage Sites?",
  options: ["China", "Italy", "France", "Spain"],
  correctAnswer: 1,
  explanation: "Italy has 58 UNESCO sites as of 2023.",
  timeLimit: 35
},
{
  id: 104,
  text: "Who was the first female prime minister in the world?",
  options: ["Indira Gandhi", "Golda Meir", "Sirimavo Bandaranaike", "Margaret Thatcher"],
  correctAnswer: 2,
  explanation: "Bandaranaike became Sri Lanka's PM in 1960.",
  timeLimit: 35
},
{
  id: 105,
  text: "What was the capital of the Byzantine Empire?",
  options: ["Rome", "Athens", "Constantinople", "Alexandria"],
  correctAnswer: 2,
  explanation: "Constantinople (now Istanbul) was the center of Byzantine civilization.",
  timeLimit: 30
},
{
  id: 106,
  text: "Which country has the most islands?",
  options: ["Philippines", "Indonesia", "Sweden", "Canada"],
  correctAnswer: 2,
  explanation: "Sweden has about 267,570 islands, though most are uninhabited.",
  timeLimit: 35
},
{
  id: 107,
  text: "Who was the first explorer to circumnavigate the globe?",
  options: ["Christopher Columbus", "Ferdinand Magellan", "Vasco da Gama", "James Cook"],
  correctAnswer: 1,
  explanation: "Magellan's expedition (1519-1522) completed the first circumnavigation, though Magellan died en route.",
  timeLimit: 35
},
{
  id: 108,
  text: "Which ancient wonder was located in Rhodes?",
  options: ["Hanging Gardens", "Colossus", "Lighthouse", "Mausoleum"],
  correctAnswer: 1,
  explanation: "The Colossus of Rhodes was a giant bronze statue destroyed in an earthquake.",
  timeLimit: 30
},
{
  id: 109,
  text: "What was the name of the first successful English colony in America?",
  options: ["Plymouth", "Jamestown", "Roanoke", "New Amsterdam"],
  correctAnswer: 1,
  explanation: "Jamestown, established in 1607, became the first permanent English settlement.",
  timeLimit: 30
},
{
  id: 110,
  text: "Which country has the longest coastline?",
  options: ["Russia", "Canada", "Australia", "Norway"],
  correctAnswer: 1,
  explanation: "Canada's coastline measures 202,080 km (125,570 mi) including islands.",
  timeLimit: 35
},
{
  id: 111,
  text: "Who was the first woman to win a Nobel Prize?",
  options: ["Marie Curie", "Mother Teresa", "Rosalind Franklin", "Jane Addams"],
  correctAnswer: 0,
  explanation: "Curie won the 1903 Physics Prize and 1911 Chemistry Prize.",
  timeLimit: 30
},
{
  id: 112,
  text: "Which ancient city was home to the Library of Alexandria?",
  options: ["Athens", "Rome", "Alexandria", "Carthage"],
  correctAnswer: 2,
  explanation: "The Great Library was part of the Musaeum in Ptolemaic Egypt.",
  timeLimit: 30
},
{
  id: 113,
  text: "What was the name of the first cloned mammal?",
  options: ["Molly the Sheep", "Daisy the Cow", "Dolly the Sheep", "Polly the Parrot"],
  correctAnswer: 2,
  explanation: "Dolly was cloned in 1996 at the Roslin Institute in Scotland.",
  timeLimit: 25
},
{
  id: 114,
  text: "Which country has the most pyramids?",
  options: ["Egypt", "Mexico", "Sudan", "Peru"],
  correctAnswer: 2,
  explanation: "Sudan has about 255 pyramids built by the Kingdom of Kush.",
  timeLimit: 35
},
{
  id: 115,
  text: "Who invented the World Wide Web?",
  options: ["Bill Gates", "Tim Berners-Lee", "Steve Jobs", "Mark Zuckerberg"],
  correctAnswer: 1,
  explanation: "Berners-Lee invented WWW in 1989 while at CERN.",
  timeLimit: 25
},
{
  id: 116,
  text: "Which ancient empire built the Great Wall of China?",
  options: ["Han Dynasty", "Qin Dynasty", "Ming Dynasty", "Shang Dynasty"],
  correctAnswer: 1,
  explanation: "The Qin Dynasty built the first unified wall in the 3rd century BCE.",
  timeLimit: 35
},
{
  id: 117,
  text: "What is the oldest active volcano on Earth?",
  options: ["Mount Etna", "Mount Vesuvius", "Mount Fuji", "Kilauea"],
  correctAnswer: 0,
  explanation: "Etna in Sicily has been erupting for about 500,000 years.",
  timeLimit: 35
},
{
  id: 118,
  text: "Which civilization invented the concept of zero?",
  options: ["Egyptians", "Greeks", "Mayans", "Indians"],
  correctAnswer: 3,
  explanation: "Indian mathematicians developed zero as a number around the 5th century CE.",
  timeLimit: 35
},
{
  id: 119,
  text: "What was the first video ever uploaded to YouTube?",
  options: ["Gangnam Style", "Charlie Bit My Finger", "Me at the zoo", "Baby Shark"],
  correctAnswer: 2,
  explanation: "YouTube co-founder Jawed Karim uploaded 'Me at the zoo' on April 23, 2005.",
  timeLimit: 30
},
{
  id: 120,
  text: "Which country has the most natural lakes?",
  options: ["Russia", "Canada", "Finland", "United States"],
  correctAnswer: 1,
  explanation: "Canada has about 2 million lakes covering 7.6% of its land area.",
  timeLimit: 35
},
{
  id: 121,
  text: "Who composed 'The Four Seasons'?",
  options: ["Mozart", "Vivaldi", "Beethoven", "Bach"],
  correctAnswer: 1,
  explanation: "Antonio Vivaldi composed this violin concerto in 1723.",
  timeLimit: 30
},
{
  id: 122,
  text: "Which artist has won the most Grammy Awards?",
  options: ["Beyoncé", "Georg Solti", "Quincy Jones", "Stevie Wonder"],
  correctAnswer: 1,
  explanation: "Hungarian-British conductor Georg Solti won 31 Grammys.",
  timeLimit: 35
},
{
  id: 123,
  text: "What is the highest-grossing Broadway show of all time?",
  options: ["The Lion King", "Wicked", "The Phantom of the Opera", "Hamilton"],
  correctAnswer: 2,
  explanation: "The Phantom of the Opera has grossed over $6 billion since 1988.",
  timeLimit: 35
},
{
  id: 124,
  text: "Which movie was the first to win Best Picture at the Oscars?",
  options: ["Wings", "Sunrise", "The Jazz Singer", "Metropolis"],
  correctAnswer: 0,
  explanation: "Wings won at the 1st Academy Awards in 1929.",
  timeLimit: 30
},
{
  id: 125,
  text: "Who painted the ceiling of the Sistine Chapel?",
  options: ["Leonardo da Vinci", "Michelangelo", "Raphael", "Donatello"],
  correctAnswer: 1,
  explanation: "Michelangelo painted it between 1508-1512 for Pope Julius II.",
  timeLimit: 30
},
{
  id: 126,
  text: "Which Shakespeare play features the character Iago?",
  options: ["Macbeth", "Hamlet", "King Lear", "Othello"],
  correctAnswer: 3,
  explanation: "Iago is the villain who manipulates Othello.",
  timeLimit: 30
},
{
  id: 127,
  text: "What was the first feature-length animated film?",
  options: ["Snow White", "Fantasia", "Steamboat Willie", "Gertie the Dinosaur"],
  correctAnswer: 0,
  explanation: "Disney's Snow White (1937) was the first cel-animated feature.",
  timeLimit: 35
},
{
  id: 128,
  text: "Which band was originally called 'The Quarrymen'?",
  options: ["The Rolling Stones", "The Beatles", "The Who", "The Kinks"],
  correctAnswer: 1,
  explanation: "John Lennon formed The Quarrymen in 1956, which evolved into The Beatles.",
  timeLimit: 35
},
{
  id: 129,
  text: "What is the best-selling novel of all time?",
  options: ["The Lord of the Rings", "Don Quixote", "A Tale of Two Cities", "The Little Prince"],
  correctAnswer: 1,
  explanation: "Miguel de Cervantes' Don Quixote has sold over 500 million copies.",
  timeLimit: 35
},
{
  id: 130,
  text: "Which artist cut off part of his own ear?",
  options: ["Pablo Picasso", "Vincent van Gogh", "Salvador Dalí", "Claude Monet"],
  correctAnswer: 1,
  explanation: "Van Gogh famously cut off his left earlobe in 1888.",
  timeLimit: 25
}
        // Add more questions...
      ];
    }
  }

  startSession(chatId, questions) {
    this.sessions.set(chatId, {
      questions,
      currentIndex: 0,
      answers: [],
      startTime: Date.now(),
      participants: new Map()
    });
  }

  getCurrentQuestion(chatId) {
    const session = this.sessions.get(chatId);
    if (!session) return null;

    const question = session.questions[session.currentIndex];
    if (!question) return null;

    return {
      ...question,
      number: session.currentIndex + 1
    };
  }

  submitAnswer(chatId, userId, answerIndex) {
    const session = this.sessions.get(chatId);
    if (!session) return { error: "No active quiz session" };

    const question = session.questions[session.currentIndex];
    const isCorrect = answerIndex === question.correctAnswer;

    // Record answer
    session.answers.push({
      userId,
      questionId: question.id,
      answerIndex,
      isCorrect,
      timestamp: Date.now()
    });

    // Update participant score
    if (!session.participants.has(userId)) {
      session.participants.set(userId, { correct: 0, total: 0 });
    }
    const participant = session.participants.get(userId);
    participant.total++;
    if (isCorrect) participant.correct++;

    // Move to next question
    session.currentIndex++;

    return {
      correct: isCorrect,
      explanation: question.explanation
    };
  }

  endSession(chatId) {
    const session = this.sessions.get(chatId);
    if (!session) return null;

    // Calculate results
    const total = session.questions.length;
    const correct = session.answers.filter(a => a.isCorrect).length;
    const timeTaken = (Date.now() - session.startTime) / 1000;

    // Save scores
    session.participants.forEach((stats, userId) => {
      if (!this.scores.has(userId)) {
        this.scores.set(userId, []);
      }
      this.scores.get(userId).push({
        date: new Date().toLocaleDateString(),
        correct: stats.correct,
        total,
        timeTaken: timeTaken / total
      });
    });

    // Clear session
    this.sessions.delete(chatId);

    return {
      correct,
      incorrect: total - correct,
      total,
      avgTime: timeTaken / total,
      score: correct
    };
  }

  getUserScores(userId) {
    return this.scores.get(userId) || [];
  }
}