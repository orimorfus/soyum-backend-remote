const { User, RefreshToken } = require('../../models');
const { blacklistRefreshToken } = require('../../utils/tokenUtils');
const {
  comparePasswords,
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/tokenUtils');

const loginController = async (req, reply) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return reply.status(400).send({ message: 'User with this email does not exist' });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return reply.status(400).send('Invalid password');
    }

    const oldRefreshTokens = await RefreshToken.find({
      userId: user._id,
      device: req.headers['user-agent'],
    });
    for (const oldRefreshToken of oldRefreshTokens) {
      await blacklistRefreshToken(oldRefreshToken.token, user._id, oldRefreshToken.expiryDate);
    }

    const accessToken = generateAccessToken(user._id, process.env.ACCESS_TOKEN_EXPIRATION);
    const refreshToken = generateRefreshToken(
      user._id,
      req.headers['user-agent'],
      process.env.REFRESH_TOKEN_EXPIRATION
    );

    const refreshTokenDoc = new RefreshToken({
      token: refreshToken,
      userId: user._id,
      device: req.headers['user-agent'],
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
  } catch (error) {
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = loginController;
