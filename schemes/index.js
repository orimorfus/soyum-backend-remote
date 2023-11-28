const registerSchema = require('./registerSchema');
const loginSchema = require('./loginSchema');
const logoutSchema = require('./logoutSchema');
const deleteAccountSchema = require('./deleteAccountSchema');
const refreshTokenSchema = require('./refreshTokenSchema');

module.exports = {
  registerSchema,
  loginSchema,
  logoutSchema,
  deleteAccountSchema,
  refreshTokenSchema,
};
