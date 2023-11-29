const { User } = require('../../models');
const { comparePasswords, hashPassword } = require('../../utils/tokenUtils');

const changePasswordController = async (req, reply) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const isOldPasswordValid = await comparePasswords(oldPassword, user.password);
    if (!isOldPasswordValid) {
      return reply.status(400).send({ message: 'Old password is incorrect' });
    }

    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();

    reply.send({ message: 'Password changed successfully' });
  } catch (error) {
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = changePasswordController;
