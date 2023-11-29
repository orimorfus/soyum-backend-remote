const { User } = require('../../models');
const { comparePasswords, hashPassword } = require('../../utils/tokenUtils');
const { Mutex } = require('async-mutex');
const mutex = new Mutex();

const changePasswordController = async (req, reply) => {
  const release = await mutex.acquire();

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
    user.updatedAt = Date.now();
    await user.save();

    reply.send({ message: 'Password changed successfully' });

    release();
  } catch (error) {
    release();
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = changePasswordController;
