const S = require('fluent-json-schema');

const registerSchema = {
  description: 'Register a new user',
  tags: ['User'],
  body: S.object()
    .prop('name', S.string().minLength(2).maxLength(30).required())
    .prop('email', S.string().required())
    .prop('password', S.string().minLength(8).required())
    .valueOf(),
  response: {
    200: S.object()
      .prop('message', S.string().required())
      .prop(
        'user',
        S.object()
          .prop('name', S.string())
          .prop('email', S.string())
          .prop('avatarUrl', S.string())
          .prop('isEmailConfirmed', S.boolean())
      )
      .prop('tokens', S.object().prop('accessToken', S.string()).prop('refreshToken', S.string()))
      .valueOf(),
    400: S.object()
      .prop('error', S.string())
      .prop('message', S.string())
      .prop('validation', S.array().items(S.string()))
      .valueOf(),
    500: S.object().prop('message', S.string().required()).valueOf(),
  },
};

module.exports = registerSchema;
