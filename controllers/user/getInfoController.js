const { User } = require('../../models');
const mongoose = require('mongoose');

const getInfoController = async (req, reply) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    reply.send({
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      isEmailConfirmed: user.isEmailConfirmed,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      reply.status(400).send({ error: error.toString() });
    } else {
      reply.status(500).send({ error: error.toString() });
    }
  }
};

module.exports = getInfoController;
