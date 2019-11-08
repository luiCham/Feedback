const mongoose = require('mongoose');

const credentialsSchema = new mongoose.Schema({


  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim:true
  },
  age: {
    type: Number,
    trim: true
  },
  cardNumber: {
    type: Number,
    trim: true
  },
  cardPassword: {
    type: Number,
    trim: true
  },
  cardExp: {
    type: Number,
    trim: true
  },
  cardSecNumber: {
    type: Number,
    trim: true
  }
});

module.exports = mongoose.model('Credentials', credentialsSchema);