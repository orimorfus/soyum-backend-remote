module.exports = {
  description: 'Change user password',
  tags: ['User'],
  body: {
    type: 'object',
    properties: {
      oldPassword: { type: 'string' },
      newPassword: { type: 'string' },
    },
    required: ['oldPassword', 'newPassword'],
  },
  response: {
    200: {
      description: 'Password changed successfully',
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
