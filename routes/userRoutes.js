const { register, login, logout, deleteAccount } = require('./controllers/user');
const verifyJWT = require('../middleware/authMiddleware');

module.exports = (fastify, opts, done) => {
  fastify.post(
    '/register',
    {
      schema: {
        description: 'Register a new user',
        tags: ['User'],
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['name', 'email', 'password'],
        },
        response: {
          201: {
            description: 'User registered successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: { type: 'object' },
              token: { type: 'string' },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    register
  );

  fastify.post(
    '/login',
    {
      schema: {
        description: 'Login a user',
        tags: ['User'],
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
        response: {
          200: {
            description: 'User logged in successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
              user: { type: 'object' },
              token: { type: 'string' },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
    },
    login
  );

  fastify.get(
    '/logout',
    {
      schema: {
        description: 'Logout a user',
        tags: ['User'],
        response: {
          200: {
            description: 'User logged out successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: [verifyJWT],
    },
    logout
  );

  fastify.get(
    '/deleteaccount',
    {
      schema: {
        description: 'Delete a user account',
        tags: ['User'],
        response: {
          200: {
            description: 'User account deleted successfully',
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: {
            description: 'Bad Request',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
          500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
              statusCode: { type: 'number' },
              error: { type: 'string' },
              message: { type: 'string' },
            },
          },
        },
      },
      preValidation: [verifyJWT],
    },
    deleteAccount
  );
  done();
};
