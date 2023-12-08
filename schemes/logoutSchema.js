const S = require('fluent-json-schema');

const getInfoSchema = {
  description: 'Get user info',
  summary: 'Logs out the user from the current session',
  tags: ['User'],
  response: {
    200: S.object()
      .description('Logged out from the current session successfully')
      .prop('message', S.string())
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = getInfoSchema;
