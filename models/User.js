const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  whatsappNumber: String,
  email: String,
  language: { type: String, default: 'en' } // Default language is English
});

module.exports = mongoose.model('User', UserSchema);
