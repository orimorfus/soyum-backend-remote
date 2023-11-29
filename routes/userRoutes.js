const {
  registerController,
  loginController,
  logoutController,
  deleteAccountController,
  refreshTokenController,
  changePasswordController,
} = require('../controllers/user');
const accessTokenMiddleware = require('../middleware');
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
    },
    registerController
  );

  fastify.post(
    '/login',
    {
      schema: loginSchema,
    },
    loginController
  );

  fastify.get(
    '/logout',
    {
      schema: logoutSchema,
      preValidation: [accessTokenMiddleware],
    },
    logoutController
  );

  fastify.post(
    '/change-password',
    {
      schema: changePasswordSchema,
      preValidation: [accessTokenMiddleware],
    },
    changePasswordController
  );

  fastify.delete(
    '/deleteaccount',
    {
      schema: deleteAccountSchema,
      preValidation: [accessTokenMiddleware],
    },
    deleteAccountController
  );
  fastify.post('/refreshtoken', { schema: refreshTokenSchema }, refreshTokenController);
  done();
};
