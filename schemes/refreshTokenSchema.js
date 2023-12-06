const S = require('fluent-json-schema');

const refreshTokenSchema = {
  description: 'Refresh access token',
  tags: ['User'],
  body: S.object().prop('refreshToken', S.string().required()).valueOf(),
  response: {
    200: S.object().prop('message', S.string()).prop('accessToken', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    401: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = refreshTokenSchema;
