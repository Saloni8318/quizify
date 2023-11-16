const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const quizSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
  correctOption: Number,
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
