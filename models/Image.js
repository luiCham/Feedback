const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const imageSchema = new Schema({
    title: { type: String },
    price: { type: String },
    description: { type: String },
    category: { type: String },
    filename: { type: String },
    path: { type: String },
    originalname: { type: String },
    mimetype: { type: String },
    size: { type: Number },
    created_at: { type: Date, default: Date.now() }
});

imageSchema.virtual('uniqueId')
  .get(function () {
    return this.filename.replace(path.extname(this.filename), '');
  });


module.exports = mongoose.model('Image', imageSchema);