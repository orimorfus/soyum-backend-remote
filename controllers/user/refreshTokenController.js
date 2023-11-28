const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../../models');
const { generateAccessToken } = require('../../utils/tokenUtils');

const refreshTokenController = async (req, reply) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) {
      return reply.status(401).send({ error: 'Refresh token not provided' });
    }

    const refreshTokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!refreshTokenDoc) {
      return reply.status(401).send({ error: 'Invalid refresh token' });
    }

    const userId = jwt.decode(refreshToken).userId;
    const user = await User.findById(userId);
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const newAccessToken = generateAccessToken(userId, process.env.ACCESS_TOKEN_EXPIRATION);

    console.log({ accessToken: newAccessToken });
    reply.send({ accessToken: newAccessToken });
  } catch (error) {
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = refreshTokenController;
