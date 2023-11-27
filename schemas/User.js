const mongoose = require('mongoose');

const emailFilter = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;

// (?=.*\d): At least one digit
// (?=.*[a-z]): At least one lowercase letter
// (?=.*[A-Z]): At least one uppercase letter
// (?=.*[^a-zA-Z0-9]): At least one special character
// (?!.*\s): No whitespace characters
const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).*$/;
const urlFilter = /^(ftp|http|https):\/\/[^ "]+$/;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: { msg: 'Name is required' },
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [30, 'Name must be less than 30 characters long'],
  },
  email: {
    type: String,
    required: { msg: 'Email is required' },
    unique: true,
    match: [emailFilter, 'Please enter a valid email'],
  },
  password: {
    type: String,
    required: { msg: 'Password is required' },
    minlength: [8, 'Password must be at least 8 characters long'],
    match: [
      passwordFilter,
      'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
    ],
  },
  avatarUrl: {
    type: String,
    match: [urlFilter, 'Please enter a valid URL'],
    default: '',
  },
  emailConfirmed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
