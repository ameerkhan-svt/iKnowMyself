const fetch = require('node-fetch');

// Configuration
const API_BASE_URL = 'http://localhost:1337';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbWVlckBhYmNkLmNvbSIsInJvbGUiOiJ0ZWFjaGVyIiwiaWF0IjoxNzUyNTgzNjU3LCJleHAiOjE3NTMxODg0NTd9.CBWtZl-UvD0vcBeiw6N8oRiI_JCZrtz2-5UKB1FvPg8'; // Replace with actual token

// Sample data arrays for generating random questions
const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography', 'Physics', 
  'Chemistry', 'Biology', 'Computer Science', 'Literature'
];

const difficulties = ['easy', 'medium', 'hard'];

const questionTemplates = {
  Mathematics: [
    'What is the result of {num1} + {num2}?',
    'Calculate the area of a rectangle with length {num1} and width {num2}.',
    'Solve for x: {num1}x + {num2} = {num3}',
    'What is {num1}% of {num2}?',
    'Find the square root of {num1}.'
  ],
  Science: [
    'What is the chemical symbol for {element}?',
    'Which planet is closest to the Sun?',
    'What is the process by which plants make their food?',
    'What gas do humans breathe in to survive?',
    'What is the hardest natural substance on Earth?'
  ],
  English: [
    'What is the past tense of "go"?',
    'Identify the noun in this sentence: "The cat sat on the mat."',
    'What is a synonym for "happy"?',
    'What type of word is "quickly"?',
    'Complete the sentence: "I have been _____ for two hours."'
  ],
  History: [
    'Who was the first President of the United States?',
    'In which year did World War II end?',
    'What ancient wonder of the world was located in Alexandria?',
    'Who painted the Mona Lisa?',
    'Which empire was ruled by Julius Caesar?'
  ],
  Geography: [
    'What is the capital of {country}?',
    'Which is the largest ocean in the world?',
    'What is the longest river in the world?',
    'Which continent has the most countries?',
    'What is the highest mountain in the world?'
  ]
};

const multipleChoiceOptions = {
  Mathematics: {
    'What is the result of 15 + 27?': ['42', '41', '43', '40'],
    'Calculate the area of a rectangle with length 8 and width 5.': ['40', '35', '45', '50'],
    'What is 25% of 80?': ['20', '25', '15', '30']
  },
  Science: {
    'What is the chemical symbol for Gold?': ['Au', 'Go', 'Gd', 'Ag'],
    'Which planet is closest to the Sun?': ['Mercury', 'Venus', 'Earth', 'Mars'],
    'What gas do humans breathe in to survive?': ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen']
  },
  English: {
    'What is the past tense of "go"?': ['went', 'gone', 'going', 'goes'],
    'What is a synonym for "happy"?': ['joyful', 'sad', 'angry', 'tired'],
    'What type of word is "quickly"?': ['adverb', 'noun', 'verb', 'adjective']
  },
  History: {
    'Who was the first President of the United States?': ['George Washington', 'Thomas Jefferson', 'John Adams', 'Benjamin Franklin'],
    'In which year did World War II end?': ['1945', '1944', '1946', '1943'],
    'Who painted the Mona Lisa?': ['Leonardo da Vinci', 'Michelangelo', 'Raphael', 'Picasso']
  },
  Geography: {
    'What is the capital of France?': ['Paris', 'London', 'Berlin', 'Madrid'],
    'Which is the largest ocean in the world?': ['Pacific', 'Atlantic', 'Indian', 'Arctic'],
    'What is the longest river in the world?': ['Nile', 'Amazon', 'Mississippi', 'Yangtze']
  }
};

const countries = ['France', 'Germany', 'Italy', 'Spain', 'Japan', 'Australia', 'Canada', 'Brazil'];
const elements = ['Gold', 'Silver', 'Iron', 'Copper', 'Oxygen', 'Carbon', 'Hydrogen'];

// Helper functions
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestionTitle(subject) {
  const templates = questionTemplates[subject] || questionTemplates.Science;
  let template = getRandomElement(templates);
  
  // Replace placeholders
  template = template.replace(/{num1}/g, getRandomNumber(1, 100));
  template = template.replace(/{num2}/g, getRandomNumber(1, 100));
  template = template.replace(/{num3}/g, getRandomNumber(1, 100));
  template = template.replace(/{country}/g, getRandomElement(countries));
  template = template.replace(/{element}/g, getRandomElement(elements));
  
  return template;
}

function generateQuestionContent(subject, difficulty) {
  const contentTemplates = {
    easy: `This is a basic ${subject} question suitable for beginners. It tests fundamental concepts and requires simple reasoning.`,
    medium: `This ${subject} question requires moderate understanding and application of concepts. Students should demonstrate clear thinking.`,
    hard: `This advanced ${subject} question challenges students to apply complex reasoning and deep understanding of the subject matter.`
  };
  
  return contentTemplates[difficulty];
}

function generateMultipleChoiceQuestion(subject, title) {
  // Check if we have predefined options for this question
  const subjectOptions = multipleChoiceOptions[subject];
  if (subjectOptions && subjectOptions[title]) {
    return {
      options: subjectOptions[title],
      correctAnswers: [0] // First option is correct
    };
  }
  
  // Generate random options based on subject
  let options = [];
  let correctAnswers = [0];
  
  switch (subject) {
    case 'Mathematics':
      const correctAnswer = getRandomNumber(1, 100);
      options = [
        correctAnswer.toString(),
        (correctAnswer + getRandomNumber(1, 10)).toString(),
        (correctAnswer - getRandomNumber(1, 10)).toString(),
        (correctAnswer + getRandomNumber(15, 25)).toString()
      ];
      break;
      
    case 'Science':
      options = ['Option A', 'Option B', 'Option C', 'Option D'];
      break;
      
    case 'English':
      options = ['Correct Answer', 'Wrong Answer 1', 'Wrong Answer 2', 'Wrong Answer 3'];
      break;
      
    default:
      options = [`Correct ${subject} Answer`, `Wrong Answer 1`, `Wrong Answer 2`, `Wrong Answer 3`];
  }
  
  return { options, correctAnswers };
}

// Main function to create a question
async function createQuestion(courseId, classGrade, teacherId) {
  const subject = getRandomElement(subjects);
  const difficulty = getRandomElement(difficulties);
  const isMultipleChoice = Math.random() > 0.5; // 50% chance of multiple choice
  
  const title = generateQuestionTitle(subject);
  const content = generateQuestionContent(subject, difficulty);
  
  const questionData = {
    title,
    subject,
    classLevel: classGrade,
    difficulty,
    content,
    isMultipleChoice,
    course: courseId,
    status: Math.random() > 0.3 ? 'PUBLISHED' : 'DRAFT', // 70% published, 30% draft
    teacher: teacherId
  };
  
  if (isMultipleChoice) {
    const mcData = generateMultipleChoiceQuestion(subject, title);
    questionData.options = mcData.options;
    questionData.correctAnswers = mcData.correctAnswers;
  }
  
  return questionData;
}

// Function to get courses and classes from API
async function getCoursesAndClasses() {
  try {
    console.log('Fetching courses and classes...');
    
    const [coursesResponse, classesResponse] = await Promise.all([
      fetch(`${API_BASE_URL}/api/v1/courses`, {
        headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
      }),
      fetch(`${API_BASE_URL}/api/v1/classes`, {
        headers: { 'Authorization': `Bearer ${AUTH_TOKEN}` }
      })
    ]);
    
    const coursesData = await coursesResponse.json();
    const classesData = await classesResponse.json();
    
    return {
      courses: coursesData.courses || [],
      classes: classesData.classes || []
    };
  } catch (error) {
    console.error('Error fetching courses and classes:', error);
    throw error;
  }
}

// Function to upload a single question
async function uploadQuestion(questionData) {
  try {
    console.log('Uploading question data:', JSON.stringify(questionData, null, 2));
    
    const response = await fetch(`${API_BASE_URL}/api/v1/questions`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(questionData)
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.log('Error response:', JSON.stringify(errorData, null, 2));
      throw new Error(JSON.stringify(errorData, null, 2));
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading question:', error);
    throw error;
  }
}

// Main seeding function
async function seedQuestions(numberOfQuestions = 100) {
  console.log(`Starting to seed ${numberOfQuestions} questions...`);
  
  try {
    // Get available courses and classes
    const { courses, classes } = await getCoursesAndClasses();
    
    if (courses.length === 0 || classes.length === 0) {
      throw new Error('No courses or classes found. Please ensure you have courses and classes in your database.');
    }
    
    console.log(`Found ${courses.length} courses and ${classes.length} classes`);
    
    // Use the current user's ID from the JWT token (user ID 3 with admin role)
    const teacherId = 3;
    
    let successCount = 0;
    let errorCount = 0;
    
    for (let i = 0; i < numberOfQuestions; i++) {
      try {
        const randomCourse = getRandomElement(courses);
        const randomClass = getRandomElement(classes);
        
        const questionData = await createQuestion(
          randomCourse.id,
          randomClass.grade,
          teacherId
        );
        
        await uploadQuestion(questionData);
        successCount++;
        
        console.log(`✅ Question ${i + 1}/${numberOfQuestions} uploaded successfully: "${questionData.title}"`);
        
        // Add small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to upload question ${i + 1}:`, error.message);
      }
    }
    
    console.log('\n🎉 Seeding completed!');
    console.log(`✅ Successfully uploaded: ${successCount} questions`);
    console.log(`❌ Failed uploads: ${errorCount} questions`);
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  }
}

// Run the script
if (require.main === module) {
  // Check if token is provided
  if (AUTH_TOKEN === 'YOUR_JWT_TOKEN_HERE') {
    console.error('❌ Please update the AUTH_TOKEN in the script with your actual JWT token');
    process.exit(1);
  }
  
  const numberOfQuestions = process.argv[2] ? parseInt(process.argv[2]) : 100;
  seedQuestions(numberOfQuestions);
}

module.exports = { seedQuestions };
