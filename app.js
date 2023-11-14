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

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'frontend', 'public')));

 const authRoutes = require('./backend/routes/authRoutes');
 app.use('/auth', authRoutes);
 
const port = process.env.PORT || 3010;

app.get('/register', (req, res) => {
  res.render('register'); 
});

app.get('/userLogin', (req, res) => {
  res.render('userLogin'); 
});

app.get('/hello', (req, res) => {
  res.render('hello'); 
});

app.get('/adminLogin', (req, res) => {
  res.render('adminLogin'); 
});  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});