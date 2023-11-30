const jwt = require('jsonwebtoken');
const { AccessTokenBlacklist } = require('../../models');

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

module.exports = blacklistAccessToken;
