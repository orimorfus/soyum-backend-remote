const S = require('fluent-json-schema');

const getRecipesSchema = {
  description: 'Search recipes',
  summary: 'Search the recipe library by keyword or meal type',
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
          'dairy-free ',
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
          'mollusk-free ',
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
          'wheat-free ',
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
          'mediterranean',
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
          'ice cream and custard',
          'main course',
          'pancake',
          'pasta',
          'pastry',
          'pies and tarts',
          'pizza',
          'preps',
          'preserve',
          'salad',
          'sandwiches',
          'seafood',
          'side dish',
          'soup',
          'special occasions',
          'starter',
          'sweets',
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
        from: { type: 'number', description: 'Starting index of results' },
        to: { type: 'number', description: 'Ending index of results' },
        count: { type: 'number', description: 'Total count of results' },
        _links: {
          type: 'object',
          properties: {
            self: {
              type: 'object',
              properties: {
                href: { type: 'string', description: 'Self link href' },
                title: { type: 'string', description: 'Self link title' },
              },
            },
            next: {
              type: 'object',
              properties: {
                href: { type: 'string', description: 'Next link href' },
              },
            },
          },
        },
        hits: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              recipe: {
                type: 'object',
                properties: {
                  uri: { type: 'string', description: 'Recipe URI' },
                  label: { type: 'string', description: 'Recipe name' },
                  image: { type: 'string', description: 'Recipe image URL' },
                  images: {
                    type: 'object',
                    properties: {
                      THUMBNAIL: {
                        type: 'object',
                        properties: {
                          url: { type: 'string', description: 'Thumbnail image URL' },
                          width: { type: 'number', description: 'Thumbnail image width' },
                          height: { type: 'number', description: 'Thumbnail image height' },
                        },
                      },
                      SMALL: {
                        type: 'object',
                        properties: {
                          url: { type: 'string', description: 'Small image URL' },
                          width: { type: 'number', description: 'Small image width' },
                          height: { type: 'number', description: 'Small image height' },
                        },
                      },
                      REGULAR: {
                        type: 'object',
                        properties: {
                          url: { type: 'string', description: 'Regular image URL' },
                          width: { type: 'number', description: 'Regular image width' },
                          height: { type: 'number', description: 'Regular image height' },
                        },
                      },
                      LARGE: {
                        type: 'object',
                        properties: {
                          url: { type: 'string', description: 'Large image URL' },
                          width: { type: 'number', description: 'Large image width' },
                          height: { type: 'number', description: 'Large image height' },
                        },
                      },
                    },
                  },
                  source: { type: 'string', description: 'Recipe source' },
                  url: { type: 'string', description: 'Recipe URL' },
                  yield: { type: 'number', description: 'Recipe yield' },
                  ingredients: {
                    type: 'array',
                    description: 'Ingredients',
                    items: {
                      type: 'object',
                      properties: {
                        quantity: { type: 'number', description: 'Ingredient quantity' },
                        measure: { type: 'string', description: 'Ingredient measure' },
                        food: { type: 'string', description: 'Ingredient food' },
                        image: { type: 'string', description: 'Ingredient image' },
                      },
                    },
                  },
                  calories: { type: 'number', description: 'Total calories' },
                  totalWeight: { type: 'number', description: 'Total weight' },
                  totalTime: { type: 'number', description: 'Total time' },
                  instructionLines: {
                    type: 'array',
                    description: 'Instructions',
                    items: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

module.exports = getRecipesSchema;
