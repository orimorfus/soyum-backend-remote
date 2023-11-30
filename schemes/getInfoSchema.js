module.exports = {
  description: 'Get user info',
  tags: ['User'],
  response: {
    200: {
      description: 'User info retrieved successfully',
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        avatarUrl: { type: 'string' },
        isEmailConfirmed: { type: 'boolean' },
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
};
