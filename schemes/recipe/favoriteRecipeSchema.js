const S = require('fluent-json-schema');

const favoriteRecipeSchema = {
  params: S.object().prop('id', S.string().required()),
};

module.exports = favoriteRecipeSchema;
