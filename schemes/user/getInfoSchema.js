const S = require('fluent-json-schema');

const getInfoSchema = {
  description: 'Get user info',
  summary: "Fetches the current user's information",
  tags: ['User'],
  response: {
    200: S.object()
      .description('Successful response')
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
        S.boolean().description('Whether the user has confirmed their email').raw({ example: true })
      )
      .required(['name', 'email', 'isEmailConfirmed'])
      .valueOf(),
    400: S.object()
      .description('Bad Request')
      .prop('message', S.string().description('Error message'))
      .valueOf(),
    401: S.object()
      .description('Unauthorized')
      .prop('message', S.string().description('Error message'))
      .valueOf(),
    500: S.object()
      .description('Internal Server Error')
      .prop('message', S.string().description('Error message'))
      .valueOf(),
  },
};

module.exports = getInfoSchema;
