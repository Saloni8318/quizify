const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://saloni:U0Bsb25pMTQwMw%3D%3D@cluster0.t70t7vn.mongodb.net/';

mongoose.connect(mongoURI);

const db = mongoose.connection;

// Event listeners for database connection
db.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Event listener for application termination
process.on('SIGINT', () => {
  db.close(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});

// Export the Mongoose instance
module.exports = mongoose;