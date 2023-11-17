const newQuiz = require('../models/quizMain');

// Function to render the quiz page
const renderQuizMainPage = (req, res) => {
  res.render('quizMain', { errorMessage: null });
};

const createNewQuiz = async (req, res) => {
  try {
    const { title, timeLimit, score, numQuestions, quizType } = req.body;
    const quiz = new newQuiz({ title, timeLimit, score, numQuestions, quizType });
    await quiz.save();
    res.redirect('/auth/quizMain');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

const fetchQuizzes = async (req, res) => {
  try {
    // Fetch quizzes from the database
    const quizzes = await newQuiz.find({});

    // Log the fetched data to the console for debugging
    console.log('Fetched quizzes:', quizzes);

    // Render an HTML template to display the quizzes
    res.render('quizMain', { quizzes, errorMessage: null });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching quizzes');
  }
}


const deleteQuiz = async (req, res) => {
  try {
    const quizId = req.params.quizId;

    // Assuming you're using Mongoose, use the Quiz model to find and delete the quiz
    await newQuiz.findByIdAndDelete(quizId);

    res.redirect('/auth/quizMain');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting the quiz');
  }
};


module.exports = {
  renderQuizMainPage,
  createNewQuiz,
  fetchQuizzes,
 // viewQuestions,
  deleteQuiz
};
