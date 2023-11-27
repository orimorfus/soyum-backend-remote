// controllers/userController.js
const User = require('../schemas/User');
const { hashPassword, generateToken, comparePasswords } = require('../utils/auth');

const register = async (req, reply) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return reply.status(400).send('User with this email already exists');
  }

  const hashedPassword = await hashPassword(password);
  const user = new User({ name, email, password: hashedPassword });
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

const login = async (req, reply) => {
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

module.exports = {
  register,
  login,
};
