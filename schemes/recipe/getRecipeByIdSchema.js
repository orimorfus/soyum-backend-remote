const getRecipesSchema = require('./getRecipesSchema');

const getRecipeByIdSchema = {
  description: 'Get recipe by ID',
  summary: 'Get a specific recipe by its ID',
  tags: ['Recipe'],
  params: {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        description: 'Recipe ID',
      },
    },
  },
  response: getRecipesSchema.response,
};

module.exports = getRecipeByIdSchema;
