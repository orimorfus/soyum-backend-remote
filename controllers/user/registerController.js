const { User, RefreshToken } = require('../../models');
const {
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} = require('../../utils/tokenUtils');

const registerController = async (req, reply) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return reply.status(400).send({ message: 'User with this email already exists' });
    }

    const hashedPassword = await hashPassword(password);
    let user = new User({ name, email, password: hashedPassword });

    user.expiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000; // 1 year

    user = await user.save();

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

    reply.code(201).send({
      message: 'Registered successfully',
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

module.exports = registerController;
