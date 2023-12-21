const S = require('fluent-json-schema');

const getHomepageRecipesSchema = {
  description: 'Get Homepage recipes',
  summary: 'Limited search meant to be used with homepage, returns just ids, labels and images',
  tags: ['Recipe'],
  querystring: S.object()
    .prop('keyword', S.string().description('Keyword to search for'))
    .prop('random', S.boolean().description('Whether the results should be random'))
    .default(false)
    .prop(
      'mealType',
      S.string()
        .enum(['breakfast', 'brunch', 'lunch', 'dinner', 'snack', 'teatime'])
        .description('Meal type to search for')
    )
    .prop(
      'diet',
      S.string()
        .enum(['balanced', 'high-fiber', 'high-protein', 'low-carb', 'low-fat', 'low-sodium'])
        .description('Diet label to search for')
    )
    .prop(
      'health',
      S.string()
        .enum([
          'alcohol-cocktail',
          'alcohol-free',
          'celery-free',
          'crustacean-free',
          'dairy-free',
          'DASH',
          'egg-free',
          'fish-free',
          'fodmap-free',
          'gluten-free',
          'immuno-supportive',
          'keto-friendly',
          'kidney-friendly',
          'kosher',
          'low-potassium',
          'low-sugar',
          'lupine-free',
          'Mediterranean',
          'mollusk-free',
          'mustard-free',
          'No-oil-added',
          'paleo',
          'peanut-free',
          'pecatarian',
          'pork-free',
          'red-meat-free',
          'sesame-free',
          'shellfish-free',
          'soy-free',
          'sugar-conscious',
          'sulfite-free',
          'tree-nut-free',
          'vegan',
          'vegetarian',
          'wheat-free',
        ])
        .description('Health label to search for')
    )
    .prop(
      'cuisineType',
      S.string()
        .enum([
          'american',
          'asian',
          'british',
          'caribbean',
          'central europe',
          'chinese',
          'eastern europe',
          'french',
          'greek',
          'indian',
          'italian',
          'japanese',
          'korean',
          'kosher',
          'Mediterranean',
          'mexican',
          'middle eastern',
          'nordic',
          'south american',
          'south east asian',
          'world',
        ])
        .description('Cuisine type to search for')
    )
    .prop(
      'dishType',
      S.string()
        .enum([
          'alcohol cocktail',
          'biscuits and cookies',
          'bread',
          'cereals',
          'condiments and sauces',
          'desserts',
          'drinks',
          'egg',
          'main course',
          'preps',
          'preserve',
          'salad',
          'sandwiches',
          'soup',
          'special occasions',
          'starter',
        ])
        .description('Dish type to search for')
    )
    .prop(
      'imageSize',
      S.string()
        .enum(['thumbnail', 'small', 'regular', 'large'])
        .description('Size of the image to return')
    ),
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        hits: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'Recipe ID' },
                  label: { type: 'string', description: 'Recipe name' },
                  image: { type: 'string', description: 'Recipe image URL' },
                },
              },
            },
          },
        },
      },
    },
  },
};
module.exports = getHomepageRecipesSchema;
