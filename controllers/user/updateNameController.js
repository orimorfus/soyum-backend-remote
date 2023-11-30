const { User } = require('../../models');
const mongoose = require('mongoose');

const updateNameController = async (req, reply) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    user.name = name;
    user.updatedAt = Date.now();
    await user.save();

    reply.send({ message: 'Name updated successfully' });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      reply.status(400).send({ error: error.toString() });
    } else {
      reply.status(500).send({ error: error.toString() });
    }
  }
};

module.exports = updateNameController;
