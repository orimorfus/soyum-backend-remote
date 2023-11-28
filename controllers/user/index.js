const registerController = require('./registerController');
const loginController = require('./loginController');
const logoutController = require('./logoutController');
const deleteAccountController = require('./deleteAccountController');
const refreshTokenController = require('./refreshTokenController');

module.exports = {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  refreshTokenController,
};
