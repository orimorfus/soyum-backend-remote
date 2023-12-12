const {
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
} = require('../controllers/user');
const {
  accessTokenMiddleware,
  deviceIdMiddleware,
  requiredFieldsValidation,
} = require('../middleware');
const {
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
} = require('../schemes');

module.exports = (fastify, opts, done) => {
  fastify.post(
    '/register',
    {
      schema: registerSchema,
      preValidation: [requiredFieldsValidation(['name', 'email', 'password']), deviceIdMiddleware],
    },
    registerController
  );

  fastify.post(
    '/login',
    {
      schema: loginSchema,
      preValidation: [requiredFieldsValidation(['email', 'password']), deviceIdMiddleware],
    },
    loginController
  );

  fastify.get(
    '/get-info',
    {
      schema: getInfoSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    getInfoController
  );

  fastify.get(
    '/logout',
    {
      schema: logoutSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    logoutController
  );

  fastify.get(
    '/logout-all',
    {
      schema: logoutAllSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    logoutAllController
  );

  fastify.patch(
    '/change-password',
    {
      schema: changePasswordSchema,
      preValidation: [
        accessTokenMiddleware,
        requiredFieldsValidation(['oldPassword', 'newPassword']),
        deviceIdMiddleware,
      ],
    },
    changePasswordController
  );
  fastify.patch(
    '/update-name',
    {
      schema: updateNameSchema,
      preValidation: [
        accessTokenMiddleware,
        requiredFieldsValidation(['name']),
        deviceIdMiddleware,
      ],
    },
    updateNameController
  );

  fastify.patch(
    '/update-avatar',
    {
      schema: updateAvatarSchema,
      preValidation: [
        accessTokenMiddleware,
        requiredFieldsValidation(['avatarUrl']),
        deviceIdMiddleware,
      ],
    },
    updateAvatarController
  );
  fastify.delete(
    '/delete-account',
    {
      schema: deleteAccountSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    deleteAccountController
  );
  fastify.post(
    '/refresh-token',
    {
      schema: refreshTokenSchema,
      preValidation: [deviceIdMiddleware],
    },
    refreshTokenController
  );

  done();
};
