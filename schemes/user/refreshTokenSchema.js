const S = require('fluent-json-schema');

const refreshTokenSchema = {
  description: 'Refresh access token',
  summary: "Refreshes the user's access token",
  tags: ['User'],
  body: S.object().prop('refreshToken', S.string().required()).valueOf(),
  response: {
    200: S.object()
      .description('Access token refreshed successfully')
      .prop('accessToken', S.string())
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = refreshTokenSchema;
