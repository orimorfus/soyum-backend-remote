const mongoose = require('mongoose');
const ms = require('ms');

const AccessTokenBlacklist = new mongoose.Schema({
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
  expiresAt: {
    required: true,
    type: Date,
    default: Date.now() + ms(process.env.ACCESS_TOKEN_EXPIRATION),
  },
});

module.exports = mongoose.model('blacklisted-access-tokens', AccessTokenBlacklist);
