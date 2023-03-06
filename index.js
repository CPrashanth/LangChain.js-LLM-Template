import express from 'express';
import generateResponse from './lib/generateResponse.js';
import { join } from 'path';
import { fileURLToPath } from 'url';

let history = []; // initialize the conversation history

const app = express();
const port = process.env.PORT || 3000;

// Set the views directory
const __dirname = fileURLToPath(new URL('.', import.meta.url));
app.set('views', join(__dirname, 'views'));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Middleware to parse the request body
app.use(express.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static(join(__dirname, 'public')));

// Render the home page
app.get('/', (req, res) => {
  res.render('index', { history: [] });
});

// Handle the conversation form submission
app.post('/ask', async (req, res) => {
  const conversationHistory = JSON.parse(req.body.history) || [];
  const question = req.body.question;
  const answer = await generateResponse({
    prompt: question,
    history: conversationHistory
  });
  const newHistory = [...conversationHistory, `Human: ${question}`, `Mr Intune: ${answer}`];
  res.render('index', { history: newHistory, answer: answer, question: question });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
