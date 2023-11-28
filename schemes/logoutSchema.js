module.exports = {
  description: 'Logout a user',
  tags: ['User'],
  headers: {
    type: 'object',
    properties: {
      'user-agent': { type: 'string' },
      authorization: { type: 'string' },
    },
    required: ['user-agent', 'authorization'],
  },
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
