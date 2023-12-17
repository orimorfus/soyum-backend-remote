const S = require('fluent-json-schema');

const recipeCategorySearchSchema = {
  params: S.object().prop('category', S.string().required()),
  querystring: S.object()
    .prop('fromNumResults', S.integer().minimum(0).required())
    .prop('toNumResults', S.integer().required()),
};

module.exports = recipeCategorySearchSchema;
