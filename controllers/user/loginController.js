const { User } = require('../schemas');
const { generateToken, comparePasswords } = require('../utils/auth');

const loginController = async (req, reply) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return reply.status(400).send('Invalid email or password');
  }

  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) {
    return reply.status(400).send('Invalid email or password');
  }

  const token = generateToken(user._id);

  user.accountExpiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;
  await user.save();
  reply.send({
    message: 'Logged in successfully',
    user: {
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      emailConfirmed: user.emailConfirmed,
    },
    token,
  });
};

module.exports = loginController;
