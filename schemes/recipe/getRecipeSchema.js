const S = require('fluent-json-schema');

const getRecipeSchema = {
  params: S.object().prop('id', S.string().required()),
};

module.exports = getRecipeSchema;
