const mongoose = require('mongoose');
const ms = require('ms');

const RefreshToken = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  device: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: Date,
    default: Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRATION),
  },
});

module.exports = mongoose.model('refresh-tokens', RefreshToken);
