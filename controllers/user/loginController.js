// This controller handles user login. It checks if the user exists and if the password is correct, then generates new access and refresh tokens.
const { User, RefreshToken } = require('../../models');
const { blacklistRefreshToken } = require('../../utils/tokenUtils');
const { generateAccessToken, generateRefreshToken } = require('../../utils/tokenUtils');
const { comparePasswords } = require('../../utils/passwordUtils');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();

const loginController = async (req, reply) => {
  const release = await mutex.acquire();

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send({ message: 'Invalid credentials' });
    }

    const oldRefreshTokens = await RefreshToken.find({
      userId: user._id,
      device: req.deviceId,
    });
    for (const oldRefreshToken of oldRefreshTokens) {
      await blacklistRefreshToken(
        oldRefreshToken.token,
        user._id,
        req.deviceId,
        oldRefreshToken.expiresAt
      );
    }

    const accessToken = generateAccessToken(user._id, process.env.ACCESS_TOKEN_EXPIRATION);
    const refreshToken = generateRefreshToken(
      user._id,
      req.deviceId,
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      userId: user._id,
      device: req.deviceId,
    });
    await refreshTokenDoc.save();

    reply.code(200).send({
      message: 'Logged in successfully',
      user: {
        name: user.name,
        email: user.email,
        isEmailConfirmed: user.isEmailConfirmed,
        avatarUrl: user.avatarUrl,
      },
      tokens: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } finally {
    release();
  }
};

module.exports = loginController;
