const { User } = require('../../schemas');
const { hashPassword, generateToken } = require('../../utils/auth');

const registerController = async (req, reply) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return reply.status(400).send('User with this email already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
  user.accountExpiresAt = Date.now() + 365 * 24 * 60 * 60 * 1000;
  await user.save();

  const token = generateToken(user._id);

  reply.code(201).send({
    message: 'Logged in successfully',
    user: {
      name: user.name,
      email: user.email,
      avatarUrl: '',
      emailConfirmed: user.emailConfirmed,
    },
    token,
  });
};

module.exports = registerController;
