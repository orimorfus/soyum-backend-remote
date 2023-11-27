const { Blacklist } = require('../schemas');

const logoutController = async (req, reply) => {
  const token = req.headers.authorization.split(' ')[1];
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  const blacklistEntry = new Blacklist({ token, expiresAt });
  await blacklistEntry.save();
  reply.send('Logged out successfully');
};

module.exports = logoutController;
