const { RefreshTokenBlacklist, RefreshToken } = require('../../models');

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

module.exports = blacklistRefreshToken;
