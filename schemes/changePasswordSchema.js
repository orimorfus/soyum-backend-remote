const S = require('fluent-json-schema');

const changePasswordSchema = {
  description: 'Change user password',
  tags: ['User'],
  body: S.object()
    .prop('oldPassword', S.string().required())
    .prop('newPassword', S.string().minLength(8).required())
    .valueOf(),
  response: {
    200: S.object().prop('message', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = changePasswordSchema;
