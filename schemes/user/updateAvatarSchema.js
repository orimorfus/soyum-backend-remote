const S = require('fluent-json-schema');

const updateAvatarSchema = {
  description: 'Update user avatar',
  summary: "Updates the user's avatar URL",
  tags: ['User'],
  body: S.object().prop('avatarUrl', S.string().format('url').required()).valueOf(),
  response: {
    200: S.object()
      .description('Avatar updated successfully')
      .prop('message', S.string())
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = updateAvatarSchema;
