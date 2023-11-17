const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const userQuizController = require('../controllers/userQuizController');
const questionController = require('../controllers/questionController');

//const userQuestionController = require('../controllers/userQuizController');

// Fetch quizzes and render the quizMain page
router.get('/quizMain', quizController.fetchQuizzes);

// POST request to create a new quiz
router.post('/quizMain', quizController.createNewQuiz);

// Display questions for a specific quiz
//router.get('/quizMain/:quizId', quizMainController.viewQuestions);
router.get('/quizMain/:quizId', questionController.viewQuestionsForQuiz);
// Display questions for a specific quiz

router.get('/quizQuestions/:quizId', questionController.viewQuestionsForQuiz);
//router.get('/quizQuestions/:quizId',questionController.saveQuestion)
router.post('/quizQuestions/:quizId',questionController.saveQuestion)

router.delete('/quizMain/:quizId', quizController.deleteQuiz);

router.delete('/quizQuestions/:quizId/:questionId', questionController.deleteQuestion);

router.get('/userQuizPage',userQuizController.fetchUserQuizzes )

router.get('/userQuizPage/:quizId', userQuizController.userViewQuestionsForQuiz);

router.post('/userQuestion',userQuizController.calculateScore)

router.get('/trueFalseQ/:quizId', questionController.viewQuestionsForQuiz)

router.post('/trueFalseQ/:quizId',questionController.saveTFQuestion)

//router.put('/quizQuestions/:quizId/:questionId', quizController.editQuestion);



module.exports = router;
