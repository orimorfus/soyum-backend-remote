const S = require('fluent-json-schema');

const deleteAccountSchema = {
  description: 'Delete a user account',
  summary: 'Allows the user to delete their account',
  tags: ['User'],
  response: {
    200: S.object()
      .description('Account deleted successfully')
      .prop('message', S.string())
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = deleteAccountSchema;
