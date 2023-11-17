const newQuiz = require('../models/quizMain');
const Question = require('../models/question');

const fetchUserQuizzes = async (req, res) => {
  try {
    // Fetch quizzes from the database
    const quizzes = await newQuiz.find({});

    // Render an HTML template to display the quizzes
    res.render('userQuizPage', { quizzes, errorMessage: null });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    res.status(500).render('errorPage', { errorMessage: 'Error fetching quizzes' });
  }
};

const userViewQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await newQuiz.findById(quizId).populate('questions');
    // console.log(quiz)

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
    console.log(quizId)
    console.log(answers)
    const quiz = await newQuiz.findById(quizId).populate('questions');
    console.log(quiz)

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
    console.log(score);
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({quiz,questions, score });
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
