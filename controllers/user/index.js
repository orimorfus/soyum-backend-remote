const registerController = require('./registerController');
const loginController = require('./loginController');
const logoutController = require('./logoutController');
const deleteAccountController = require('./deleteAccountController');
const refreshTokenController = require('./refreshTokenController');
const changePasswordController = require('./changePasswordController');
const updateAvatarController = require('./updateAvatarController');
const updateNameController = require('./updateNameController');
const logoutAllController = require('./logoutAllController');
const getInfoController = require('./getInfoController');

module.exports = {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  refreshTokenController,
  changePasswordController,
  updateAvatarController,
  updateNameController,
  logoutAllController,
  getInfoController,
};
