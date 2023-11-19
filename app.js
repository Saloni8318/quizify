const express = require('express');
const mongoose = require('./backend/db');
const methodOverride = require('method-override');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'frontend', 'views'));


// Method override middleware
app.use(methodOverride('_method'));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

 const authRoutes = require('./backend/routes/authRoutes');
 app.use('/auth', authRoutes);
 const quizRoutes = require('./backend/routes/quizMainRoutes');
 app.use('/auth', quizRoutes);

const port = process.env.PORT || 3000;

app.get('/register', (req, res) => {
  res.render('register'); 
});

app.get('/login', (req, res) => {
  res.render('login'); 
});

app.get('/questions',(req,res) => {
  res.render('questions');
})

app.get('/quizMain',(req,res) => {
  res.render('quizMain');
})

app.get('/subjectWiseQuiz',(req,res) => {
  res.render('subjectWiseQuiz');
})

app.get('/subWiseQuizUser',(req,res) => {
  res.render('subWiseQuizUser');
})

app.get('/userQuizPage',(req,res) => {
  res.render('userQuizPage');
})

app.get('/userQuestion',(req,res) => {
  res.render('userQuestion');
})

app.get('/layoutAdmin',(req,res) => {
  res.render('layoutAdmin');
})

app.get('/layoutUser',(req,res) => {
  res.render('layoutUser');
})


app.get('/layout', (req, res) => {
  res.render('layout')
})

app.get('/hello',(req,res) => {
  res.render('hello')
})

app.get('/header',(req,res) => {
  res.render('header')
})

app.get('/footer',(req,res) => {
  res.render('footer')
})

app.get('/quizQuestions', (req, res) => {
  res.render('quizQuestions')
})

app.get('/trueFalseQ', (req,res) => {
  res.render('trueFalseQ')
})

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
