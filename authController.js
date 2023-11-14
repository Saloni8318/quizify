const User = require('../models/user');
const bcrypt = require('bcrypt');

// Function to render the registration page
const renderRegistrationPage = (req, res) => {
  res.render('register', { errorMessage: null });
};

// Function to handle user registration
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    console.log(username);
    console.log(email);
    console.log(password);

    // Check if the username or email is already registered
    //const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    const existingUser = await User.findOne({ $or: [{ username: username.trim() }, { email: email.trim() }] });


    if (existingUser) {
      return res.render('register', { errorMessage: 'Username or email is already registered.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedConfirmPassword = await bcrypt.hash(confirmPassword, 10);

    // Create a new user with the hashed password
    const user = new User({ username, email, password: hashedPassword, confirmPassword: hashedConfirmPassword });

    // Save the user to the database
    await user.save();

    console.log('User saved successfully');

    // Redirect to the login page after successful registration
    res.redirect('/userLogin');
  } catch (error) {
    console.error('Registration error:', error);
    // Handle errors, e.g., display an error message on the registration page
    res.status(500).render('register', { errorMessage: 'Registration failed: ' + error.message });
  }
};
// Function to handle user login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username);
    console.log(password)

    // Find the user by username in the database
    const user = await User.findOne({ username });

    if (!user) {
      // User not found, display an error message
      return res.render('userLogin', { errorMessage: 'User not found' });
    }

    // Compare the entered password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      // Passwords don't match, display an error message
      return res.render('userLogin', { errorMessage: 'Incorrect password' });
    }
    // Successful login, you can implement session management or JWT token generation here
    // Redirect the user to a dashboard or profile page
    res.redirect('/auth/quizMain');
  } catch (error) {
    console.error('Login error:', error);
    // Handle other errors, e.g., display a generic error message
    res.status(500).render('userLogin', { errorMessage: 'Login failed: ' + error.message });
  }
};

// Function to handle user login
const loginAdmin = async (req, res) => {
  try {
    const { username, SecurityCode } = req.body;
    console.log(username);
    console.log(SecurityCode);

    // Find the user by username in the database
   // const user = await User.findOne({ username });
   const validAdminUsernames = ['saloni', 'payal', 'manisha'];

   const Code = '123'
   if (!validAdminUsernames.includes(username)) {
    return res.render('adminLogin', { errorMessage: 'Invalid admin' });
  }
    if (SecurityCode != Code) {
      // Passwords don't match, display an error message
      return res.render('adminLogin', { errorMessage: 'Incorrect password' });
    }

    // Successful login, you can implement session management or JWT token generation here
    // Redirect the user to a dashboard or profile page
    res.send("Hello admin")
  } catch (error) {
    console.error('Login error:', error);
    // Handle other errors, e.g., display a generic error message
    res.status(500).render('adminLogin', { errorMessage: 'Login failed: ' + error.message });
  }
};
module.exports = {
  renderRegistrationPage,
  registerUser,
  loginUser,
  loginAdmin
}
// ... (rest of your code)
