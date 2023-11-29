module.exports = {
  description: 'Logout a user',
  tags: ['User'],
  response: {
    200: {
      description: 'Logged out successfully',
      type: 'object',
      properties: {
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
