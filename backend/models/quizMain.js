const mongoose = require('mongoose');
const Question = require('./question'); 

const newQuizSchema = new mongoose.Schema({
  subject: {
    type:String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  timeLimit: {
      type: String,
      required: true,
  },
  quizType: {
    type: String,
    enum: ['multiple_choice', 'true_false', 'other_question_type'],
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question', // Reference to the Question model
  }],
});

const newQuiz = mongoose.model('newQuiz', newQuizSchema);

module.exports = newQuiz;