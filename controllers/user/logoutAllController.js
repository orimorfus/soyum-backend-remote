const { RefreshToken } = require('../../models');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { blacklistAccessToken, blacklistRefreshToken } = require('../../utils/tokenUtils');

const logoutAllController = async (req, reply) => {
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

    reply.send({ message: 'Logged out of all sessions successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      reply.status(400).send({ error: error.toString() });
    } else {
      console.error(error);
      reply.status(500).send({ error: error.toString() });
    }
  }
};

module.exports = logoutAllController;
