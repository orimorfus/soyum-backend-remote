const { User } = require('../../schemas');
const { comparePasswords } = require('../../utils/auth');

const deleteAccountController = async (req, reply) => {
  const userId = req.user.id;
  const { password } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return reply.status(404).send('User not found');
  }

  const validPassword = await comparePasswords(password, user.password);
  if (!validPassword) {
    return reply.status(400).send('Invalid password');
  }

  await User.findByIdAndDelete(userId);

  reply.send('User deleted successfully');
};

module.exports = deleteAccountController;
