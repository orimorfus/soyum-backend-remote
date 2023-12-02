const { User } = require('../../models');

const updateNameController = async (req, reply) => {
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
};

module.exports = updateNameController;
