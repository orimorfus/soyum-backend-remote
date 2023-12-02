const { RefreshToken } = require('../../models');
const jwt = require('jsonwebtoken');
const { blacklistAccessToken, blacklistRefreshToken } = require('../../utils/tokenUtils');

const logoutAllController = async (req, reply) => {
  const accessToken = req.headers.authorization.split(' ')[1];
  const userId = jwt.decode(accessToken).id;
  const deviceId = req.deviceId;
  await blacklistAccessToken(accessToken, userId);

  const refreshTokenDocs = await RefreshToken.find({ userId, deviceId });
  for (const refreshTokenDoc of refreshTokenDocs) {
    await blacklistRefreshToken(
      refreshTokenDoc.token,
      refreshTokenDoc.userId,
      refreshTokenDoc.deviceId,
      refreshTokenDoc.expiresAt
    );
  }

  reply.send({ message: 'Logged out of all sessions successfully' });
};

module.exports = logoutAllController;
