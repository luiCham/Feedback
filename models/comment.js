const mongoose = require('mongoose');
const { Schema } = mongoose;
const ObjectId = Schema.ObjectId;
const path = require('path');

const CommentSchema = new Schema({
  image_id: { type: ObjectId },
  email: { type: String },
  name: { type: String },
  comment: { type: String },
  gravatar: { type : String },
  timestamp: { type: Date, default: Date.now }
});


module.exports = mongoose.model('Comment', CommentSchema);