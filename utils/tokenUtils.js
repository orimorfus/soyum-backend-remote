// This module contains utility functions for handling tokens, such as generating access and refresh tokens, hashing passwords, and comparing passwords.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { SECRET } = require('../envConfig');
const { AccessTokenBlacklist, RefreshTokenBlacklist, RefreshToken } = require('../models');

const generateAccessToken = (userId, expiresIn) => {
  return jwt.sign({ id: userId }, SECRET, { expiresIn });
};

function generateRefreshToken(userId, userAgent, expiresIn) {
  const payload = {
    userId,
    userAgent,
  };
  return jwt.sign(payload, SECRET, { expiresIn });
}

const hashPassword = async password => {
  return await bcrypt.hash(password, 10);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const blacklistAccessToken = async (accessToken, userId) => {
  const existingBlacklistDoc = await AccessTokenBlacklist.findOne({ token: accessToken });
  if (!existingBlacklistDoc) {
    const blacklistDoc = new AccessTokenBlacklist({
      token: accessToken,
      userId: userId,
      expiresAt: jwt.decode(accessToken).exp,
    });
    await blacklistDoc.save();
  }
};

const blacklistRefreshToken = async (refreshToken, userId, deviceId, expiresAt) => {
  const existingBlacklistDoc = await RefreshTokenBlacklist.findOne({ token: refreshToken });
  if (!existingBlacklistDoc) {
    const blacklistDoc = new RefreshTokenBlacklist({
      token: refreshToken,
      userId: userId,
      deviceId: deviceId,
      expiresAt: expiresAt,
    });
    await blacklistDoc.save();
  }
  await RefreshToken.deleteOne({ token: refreshToken });
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  hashPassword,
  comparePasswords,
  blacklistAccessToken,
  blacklistRefreshToken,
};
