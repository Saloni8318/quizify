const mongoose = require('mongoose');

const trueFalseSchema = new mongoose.Schema({
    questionText: {
        type: String,
        required: true,
    },

    correctOption: {
        type: String,
        enum: ['true', 'false'],
        required: true,
    },

    marks: {
        type: Number,
        required: true,
    }
});

const TrueFalseQuestion = mongoose.model('TrueFalseQuestion', trueFalseSchema);

module.exports = TrueFalseQuestion;
