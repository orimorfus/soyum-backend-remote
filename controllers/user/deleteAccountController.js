const { User } = require('../../models');
const {
  comparePasswords,
  blacklistAccessToken,
  blacklistRefreshToken,
} = require('../../utils/tokenUtils');
const RefreshToken = require('../../models/RefreshToken');
const deleteAccountController = async (req, reply) => {
  try {
    const userId = req.user.id;
    const deviceId = req.deviceId;
    const { password } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return reply.status(404).send({ message: 'User not found' });
    }

    const validPassword = await comparePasswords(password, user.password);
    if (!validPassword) {
      return reply.status(400).send({ message: 'Invalid password' });
    }

    const accessToken = req.headers.authorization.split(' ')[1];
    await blacklistAccessToken(accessToken, userId);

    const refreshTokenDocs = await RefreshToken.find({ userId, deviceId });
    for (const refreshTokenDoc of refreshTokenDocs) {
      await blacklistRefreshToken(
        refreshTokenDoc.token,
        refreshTokenDoc.userId,
        refreshTokenDoc.deviceId,
        refreshTokenDoc.expiresAt
      );
    }

    await User.findByIdAndDelete(userId);

    reply.send({ message: 'User deleted successfully' });
  } catch (error) {
    reply.status(500).send({ error: error.toString() });
  }
};

module.exports = deleteAccountController;
