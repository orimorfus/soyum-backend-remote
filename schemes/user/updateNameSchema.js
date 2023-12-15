const S = require('fluent-json-schema');

const updateNameSchema = {
  description: 'Update user name',
  summary: "Updates the user's name",
  tags: ['User'],
  body: S.object().prop('name', S.string().minLength(2).maxLength(30).required()).valueOf(),
  response: {
    200: S.object().description('Name updated successfully').prop('message', S.string()).valueOf(),
    400: S.object().description('Bad Request').prop('message', S.string()).valueOf(),
    401: S.object().description('Unauthorized').prop('message', S.string()).valueOf(),
    500: S.object().description('Internal Server Error').prop('message', S.string()).valueOf(),
  },
};

module.exports = updateNameSchema;
