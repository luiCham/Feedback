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
  address: {
    type: String,
    trim: false
  },
  city: {
    type: String,
    trim: true
  }
});

module.exports = mongoose.model('credentials', credentialsSchema);