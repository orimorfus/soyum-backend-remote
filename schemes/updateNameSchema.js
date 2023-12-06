const S = require('fluent-json-schema');

const updateNameSchema = {
  description: 'Update user name',
  tags: ['User'],
  body: S.object().prop('name', S.string().minLength(2).maxLength(30).required()).valueOf(),
  response: {
    200: S.object().prop('message', S.string()).valueOf(),
    400: S.object().prop('message', S.string()).valueOf(),
    401: S.object().prop('message', S.string()).valueOf(),
    500: S.object().prop('message', S.string()).valueOf(),
  },
};

module.exports = updateNameSchema;
