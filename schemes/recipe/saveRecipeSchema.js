const S = require('fluent-json-schema');

const saveRecipeSchema = {
  body: S.object()
    .prop('uri', S.string().required())
    .prop('label', S.string().required())
    .prop('image', S.string())
    .prop('source', S.string())
    .prop('url', S.string())
    .prop('yield', S.number())
    .prop('calories', S.number())
    .prop('totalWeight', S.number())
    .prop('dietLabels', S.array().items(S.string()))
    .prop('healthLabels', S.array().items(S.string()))
    .prop('cautions', S.array().items(S.string()))
    .prop('ingredientLines', S.array().items(S.string()))
    .prop(
      'ingredients',
      S.array().items(
        S.object()
          .prop('text', S.string())
          .prop('quantity', S.number())
          .prop('measure', S.string())
          .prop('food', S.string())
          .prop('weight', S.number())
          .prop('foodCategory', S.string())
          .prop('foodId', S.string())
          .prop('image', S.string())
      )
    )
    .prop('totalTime', S.number())
    .prop('cuisineType', S.array().items(S.string()))
    .prop('mealType', S.array().items(S.string()))
    .prop('dishType', S.array().items(S.string()))
    .prop('totalNutrients', S.object())
    .prop('totalDaily', S.object())
    .prop('digest', S.array())
    .prop('instructionLines', S.array().items(S.string()))
    .prop('tags', S.array().items(S.string()))
    .prop('favoritedBy', S.array().items(S.string()))
    .prop('creator', S.string()),
};

module.exports = saveRecipeSchema;
