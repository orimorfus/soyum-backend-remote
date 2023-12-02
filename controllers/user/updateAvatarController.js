const { User } = require('../../models');

const updateAvatarController = async (req, reply) => {
  const userId = req.user.id;
  const { avatarUrl } = req.body;

  const user = await User.findById(userId);
  if (!user) {
    return reply.status(404).send({ message: 'User not found' });
  }

  user.avatarUrl = avatarUrl;
  user.updatedAt = Date.now();
  await user.save();

  reply.send({ message: 'Avatar updated successfully' });
};

module.exports = updateAvatarController;
