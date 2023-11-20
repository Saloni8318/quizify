const newQuiz = require('../models/quizMain');
const Question = require('../models/mcqQuestion');

const fetchUserQuizzes = async (req, res) => {
  try {
    const subject = req.params.subject; // Extract the subject from the request parameters

    // Fetch quizzes from the database based on the subject
    const quizzes = await newQuiz.find({ subject });

    // Log the fetched data to the console for debugging
    console.log('Fetched quizzes:', quizzes);

    // Render an HTML template to display the quizzes
    res.render('userQuizPage', { quizzes, errorMessage: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quizzes');
  }
};


const userViewQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await newQuiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const questions = quiz.questions || [];
    res.render('userQuestion', { quiz, questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quiz questions');
  }
};
// Calculate score based on submitted answers
const calculateScore = async (req, res) => {
  try {
    const { quizId, answers } = req.body;
    const quiz = await newQuiz.findById(quizId).populate('questions');

    if (!quiz) {
      return res.status(404).send('Quiz not found');
    }

    const questions = quiz.questions || [];

    let score = 0;
    for (const answer of answers) {
      const question = questions.find(q => q._id.toString() === answer.questionId);
      if (question) {
        const selectedOption = question.options[answer.selectedOption];
        if (selectedOption && selectedOption.isCorrect) {
          score += question.marks;
        }
      }
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ quiz, questions, score });
    //res.render('userQuestion', { quiz, score,questions });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error calculating the score');
  }
};

module.exports = {
  fetchUserQuizzes,
  userViewQuestionsForQuiz,
  calculateScore
};
