const S = require('fluent-json-schema');

const updateAvatarSchema = {
  description: 'Update user avatar',
  tags: ['User'],
  body: S.object().prop('avatarUrl', S.string().format('url').required()).valueOf(),
  response: {
    200: S.object().prop('message', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = updateAvatarSchema;
