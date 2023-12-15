const registerSchema = require('./registerSchema');
const loginSchema = require('./loginSchema');
const logoutSchema = require('./logoutSchema');
const deleteAccountSchema = require('./deleteAccountSchema');
const refreshTokenSchema = require('./refreshTokenSchema');
const changePasswordSchema = require('./changePasswordSchema');
const updateAvatarSchema = require('./updateAvatarSchema');
const updateNameSchema = require('./updateNameSchema');
const logoutAllSchema = require('./logoutAllSchema');
const getInfoSchema = require('./getInfoSchema');

module.exports = {
  registerSchema,
  loginSchema,
  logoutSchema,
  deleteAccountSchema,
  refreshTokenSchema,
  changePasswordSchema,
  updateAvatarSchema,
  updateNameSchema,
  logoutAllSchema,
  getInfoSchema,
};
