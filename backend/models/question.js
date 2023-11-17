const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  // options: {
  //   type: [String],
  //   required: true,
  // },
  options: [
    {
      text: String,
      isCorrect: Boolean,
    }
  ],

   correctOption: {
     type: Number,
     required: true,
   },

   marks: {
    type: Number,
    required: true,
   }
  // quiz: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'newQuiz', // Reference to the newQuiz model
  // },
  // // Add any other fields you need for your questions
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
