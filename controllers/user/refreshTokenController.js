// This controller handles access token refresh. It validates the refresh token and generates a new access token.
const jwt = require('jsonwebtoken');
const { User, RefreshToken } = require('../../models');
const { generateAccessToken } = require('../../utils/tokenUtils');
const mongoose = require('mongoose');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();

const refreshTokenController = async (req, reply) => {
  const release = await mutex.acquire();

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

    reply.send({ accessToken: newAccessToken });

    release();
  } catch (error) {
    release();
    if (error instanceof mongoose.Error.ValidationError) {
      reply.status(400).send({ error: error.toString() });
    } else {
      reply.status(500).send({ error: error.toString() });
    }
  }
};
module.exports = refreshTokenController;
