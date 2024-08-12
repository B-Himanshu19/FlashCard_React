const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const flashcardSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

const Flashcard = mongoose.model('Flashcard', flashcardSchema);

app.post('/flashcards', async (req, res) => {
  const { question, options, answer } = req.body;

  try {
    const flashcard = new Flashcard({ question, options, answer });
    await flashcard.save();

    res.status(201).send('Flashcard created');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.put('/flashcards/:id', async (req, res) => {
  const { id } = req.params;
  const { question, options, answer } = req.body;

  try {
    const flashcard = await Flashcard.findByIdAndUpdate(id, { question, options, answer }, { new: true });
    if (!flashcard) return res.status(404).send('Flashcard not found');

    res.send('Flashcard updated');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.delete('/flashcards/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const flashcard = await Flashcard.findByIdAndDelete(id);
    if (!flashcard) return res.status(404).send('Flashcard not found');

    res.send('Flashcard deleted');
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find();
    res.json(flashcards);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

app.post('/flashcards/:id/answer', async (req, res) => {
  const { id } = req.params;
  const { selectedOption } = req.body;

  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) return res.status(404).send('Flashcard not found');

    const isCorrect = flashcard.answer === selectedOption;
    res.json({ isCorrect });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
