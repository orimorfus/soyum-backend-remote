const {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  refreshTokenController,
  changePasswordController,
} = require('../controllers/user');
const { accessTokenMiddleware, deviceIdMiddleware } = require('../middleware');
const {
  registerSchema,
  loginSchema,
  logoutSchema,
  deleteAccountSchema,
  refreshTokenSchema,
  changePasswordSchema,
} = require('../schemes');

module.exports = (fastify, opts, done) => {
  fastify.post(
    '/register',
    {
      schema: registerSchema,
      preValidation: [deviceIdMiddleware],
    },
    registerController
  );

  fastify.post(
    '/login',
    {
      schema: loginSchema,
      preValidation: [deviceIdMiddleware],
    },
    loginController
  );

  fastify.get(
    '/logout',
    {
      schema: logoutSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    logoutController
  );

  fastify.post(
    '/change-password',
    {
      schema: changePasswordSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    changePasswordController
  );

  fastify.delete(
    '/deleteaccount',
    {
      schema: deleteAccountSchema,
      preValidation: [accessTokenMiddleware, deviceIdMiddleware],
    },
    deleteAccountController
  );
  fastify.post(
    '/refreshtoken',
    { schema: refreshTokenSchema, preValidation: [deviceIdMiddleware] },
    refreshTokenController
  );
  done();
};
