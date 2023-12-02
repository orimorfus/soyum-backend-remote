const S = require('fluent-json-schema');

const deleteAccountSchema = {
  description: 'Delete a user account',
  tags: ['User'],
  response: {
    200: S.object().prop('message', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = deleteAccountSchema;
