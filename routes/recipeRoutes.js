const { getRecipesSchema, getRecipeByIdSchema } = require('../schemes/recipe');
const { getRecipesController, getRecipeByIdController } = require('../controllers/recipe');

module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: getRecipesSchema,
    handler: getRecipesController,
  });

  fastify.route({
    method: 'GET',
    url: '/by-id/:id',
    schema: getRecipeByIdSchema,
    handler: getRecipeByIdController,
  });

  done();
};
