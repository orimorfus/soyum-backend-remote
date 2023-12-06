const S = require('fluent-json-schema');

const logoutAllSchema = {
  description: 'Logout all sessions for a user',
  tags: ['User'],
  response: {
    200: S.object().prop('message', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    401: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = logoutAllSchema;
