module.exports = {
  description: 'Update user avatar',
  tags: ['User'],
  body: {
    type: 'object',
    properties: {
      avatarUrl: { type: 'string' },
    },
    required: ['avatarUrl'],
  },
  response: {
    200: {
      description: 'Avatar updated successfully',
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
};
