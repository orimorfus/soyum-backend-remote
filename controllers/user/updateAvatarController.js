const { User } = require('../../models');
const mongoose = require('mongoose');

const updateAvatarController = async (req, reply) => {
  try {
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
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      reply.status(400).send({ error: error.toString() });
    } else {
      reply.status(500).send({ error: error.toString() });
    }
  }
};

module.exports = updateAvatarController;
