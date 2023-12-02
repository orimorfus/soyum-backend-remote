// This controller handles password change. It checks if the old password is correct, then updates the password in the database.
const { User } = require('../../models');
const { comparePasswords } = require('../../utils/passwordUtils');
const { Mutex } = require('async-mutex');

const mutex = new Mutex();

const changePasswordController = async (req, reply) => {
  const release = await mutex.acquire();

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

  user.password = newPassword;
  user.updatedAt = Date.now();
  await user.save();

  reply.send({ message: 'Password changed successfully' });

  release();
};

module.exports = changePasswordController;
