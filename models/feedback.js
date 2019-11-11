const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
    productTitle: {
        type: String,
        trim: true
    },
    comment: {
        type: String,
        trim: true
    },
    user: {
        type: String,
        trim: true
    }
});

module.exports = model('feedback', feedbackSchema);