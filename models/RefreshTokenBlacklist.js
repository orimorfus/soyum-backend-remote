// This is the Mongoose schema for the RefreshTokenBlacklist model. It defines the fields and validation for RefreshTokenBlacklist documents.
const mongoose = require('mongoose');
const ms = require('ms');

const RefreshTokenBlacklist = new mongoose.Schema({
  token: {
    required: true,
    type: String,
    unique: true,
  },
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  deviceId: {
    required: true,
    type: String,
    default: '',
  },
  expiresAt: {
    required: true,
    type: Date,
    default: Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRATION),
  },
});

module.exports = mongoose.model('blacklisted-refresh-tokens', RefreshTokenBlacklist);
