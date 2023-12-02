const S = require('fluent-json-schema');

const getInfoSchema = {
  description: 'Get user info',
  tags: ['User'],
  response: {
    200: S.object()
      .prop('name', S.string())
      .prop('email', S.string())
      .prop('avatarUrl', S.string())
      .prop('isEmailConfirmed', S.boolean())
      .valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = getInfoSchema;
