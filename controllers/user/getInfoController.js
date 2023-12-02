const { User } = require('../../models');

const getInfoController = async (req, reply) => {
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
};

module.exports = getInfoController;
