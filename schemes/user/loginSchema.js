const S = require('fluent-json-schema');

const loginSchema = {
  description: 'Login a user',
  summary: 'Logs in the user and returns an access token',
  tags: ['User'],
  body: S.object()
    .prop('email', S.string().format('email').required())
    .prop('password', S.string().minLength(8).required())
    .valueOf(),
  response: {
    200: S.object()
      .description('Logged in successfully')
      .prop('message', S.string())
      .prop(
        'user',
        S.object()
          .prop('name', S.string().description("User's name").raw({ example: 'John Doe' }))
          .prop(
            'email',
            S.string().description("User's email").raw({ example: 'john.doe@example.com' })
          )
          .prop(
            'avatarUrl',
            S.string()
              .description("URL of the user's avatar")
              .raw({ example: 'http://example.com/avatar.jpg' })
          )
          .prop(
            'isEmailConfirmed',
            S.boolean()
              .description('Whether the user has confirmed their email')
              .raw({ example: true })
          )
      )
      .prop(
        'tokens',
        S.object()
          .prop('accessToken', S.string().raw({ example: 'access_token' }))
          .prop('refreshToken', S.string().raw({ example: 'refresh_token' }))
      )
      .valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = loginSchema;
