// This is the Fastify schema for the delete account endpoint. It defines the request and response structure and validation.
module.exports = {
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
};
