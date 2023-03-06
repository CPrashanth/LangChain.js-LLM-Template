const express = require('express');
const generateResponse = require('./lib/generateResponse');
const promptSync = require('prompt-sync')();

const app = express();
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Route for the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// Route for handling form submission
app.post('/ask', async (req, res) => {
  const question = req.body.question;
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory
  });

  conversationHistory.push(`Human: ${question}`, `Mr Intune: ${answer}`);

  // Pass the conversation history and answer to the view
  res.render('index', { history: conversationHistory, answer });
});

const conversationHistory = [];

app.listen(3000, () => {
  console.log('Server started on port http://localhost:3000');
});
