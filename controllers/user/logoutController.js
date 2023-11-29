// This controller handles user logout. It invalidates the user's access and refresh tokens.
const { RefreshToken } = require('../../models');
const jwt = require('jsonwebtoken');
const { blacklistAccessToken, blacklistRefreshToken } = require('../../utils/tokenUtils');

const logoutController = async (req, reply) => {
  try {
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

    reply.send({ message: 'Logged out successfully' });
  } catch (error) {
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = logoutController;
