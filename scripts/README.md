# Question Seeding Script

This script generates and uploads random questions to seed your database with test data.

## Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Get Your JWT Token**
   - Sign in to your application
   - Open browser developer tools (F12)
   - Go to Application/Storage tab → Local Storage
   - Copy the value of the `token` key
   - Or check the Authorization header in Network tab

3. **Update the Script**
   - Open `scripts/seedQuestions.js`
   - Replace `YOUR_JWT_TOKEN_HERE` with your actual JWT token
   - Optionally update `teacherId` (defaults to 1)

## Usage

### Default (100 questions)
```bash
npm run seed:questions
```

### Custom number of questions
```bash
npm run seed:questions:50    # 50 questions
npm run seed:questions:200   # 200 questions
node scripts/seedQuestions.js 150  # 150 questions
```

## What the Script Does

### Question Generation
- **Subjects**: Mathematics, Science, English, History, Geography, Physics, Chemistry, Biology, Computer Science, Literature
- **Difficulties**: Easy, Medium, Hard
- **Types**: 50% Multiple Choice, 50% Regular Questions
- **Status**: 70% Published, 30% Draft

### Question Content
- **Mathematics**: Arithmetic, geometry, algebra problems
- **Science**: Chemistry symbols, planets, biology facts
- **English**: Grammar, vocabulary, sentence structure
- **History**: Historical figures, dates, events
- **Geography**: Countries, capitals, natural features

### Multiple Choice Questions
- 4 options per question (A, B, C, D)
- First option is typically correct
- Subject-specific realistic distractors

## Sample Generated Questions

### Mathematics (Multiple Choice)
```
Title: "What is the result of 15 + 27?"
Options: ["42", "41", "43", "40"]
Correct Answer: 0 (42)
```

### Science (Multiple Choice)
```
Title: "What is the chemical symbol for Gold?"
Options: ["Au", "Go", "Gd", "Ag"]
Correct Answer: 0 (Au)
```

### English (Regular Question)
```
Title: "What is the past tense of 'go'?"
Content: "This is a basic English question suitable for beginners..."
```

## Output

The script provides real-time feedback:
```
Starting to seed 100 questions...
Found 5 courses and 6 classes
✅ Question 1/100 uploaded successfully: "What is 25% of 80?"
✅ Question 2/100 uploaded successfully: "What is the chemical symbol for Gold?"
...
🎉 Seeding completed!
✅ Successfully uploaded: 98 questions
❌ Failed uploads: 2 questions
```

## Error Handling

- Network errors are caught and logged
- Failed uploads don't stop the process
- Summary shows success/failure counts
- Rate limiting with 100ms delay between requests

## Customization

### Add New Subjects
Edit the `subjects` array in `seedQuestions.js`:
```javascript
const subjects = [
  'Mathematics', 'Science', 'English', 'History', 'Geography',
  'Art', 'Music', 'Physical Education' // Add your subjects
];
```

### Add Question Templates
Update the `questionTemplates` object:
```javascript
const questionTemplates = {
  Art: [
    'Who painted {artwork}?',
    'What art movement is characterized by {characteristic}?'
  ]
};
```

### Modify Multiple Choice Options
Update the `multipleChoiceOptions` object with predefined answers.

## Prerequisites

- Backend API running on http://localhost:1337
- Valid JWT token
- Courses and classes already exist in database
- Teacher account with valid ID

## Troubleshooting

1. **"No courses or classes found"**
   - Ensure you have created courses and classes in your database first

2. **"Authorization failed"**
   - Check your JWT token is valid and not expired
   - Ensure the token format is correct (without "Bearer " prefix)

3. **"Connection refused"**
   - Verify your backend is running on port 1337
   - Check the API_BASE_URL in the script

4. **High failure rate**
   - Check server logs for validation errors
   - Ensure course and class IDs exist
   - Verify teacher ID is valid
