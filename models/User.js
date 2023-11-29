// This is the Mongoose schema for the User model. It defines the fields and validation for User documents.
const mongoose = require('mongoose');
const { hashPassword } = require('../utils/tokenUtils');

const emailFilter = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const passwordFilter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).*$/;
const urlFilter = /^(ftp|http|https):\/\/[^ "]+$/;

const User = new mongoose.Schema({
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
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  expiresAt: {
    type: Date,
    default: Date.now() + 365 * 24 * 60 * 60 * 1000, // 1 year
  },
});

User.pre('save', async function (next) {
  if (this.isNew) {
    this.createdAt = this.updatedAt = Date.now();
    this.password = await hashPassword(this.password);
  } else {
    this.updatedAt = Date.now();
  }
  next();
});

module.exports = mongoose.model('users', User);
