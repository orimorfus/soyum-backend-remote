const S = require('fluent-json-schema');

const changePasswordSchema = {
  description: 'Change user password',
  summary: 'Allows the user to change their password',
  tags: ['User'],
  body: S.object()
    .prop('oldPassword', S.string().required())
    .prop('newPassword', S.string().minLength(8).required())
    .valueOf(),
  response: {
    200: S.object()
      .description('Password changed successfully')
      .prop('message', S.string())
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = changePasswordSchema;
