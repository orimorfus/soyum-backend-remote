const {
  getRecipesSchema,
  getRecipeByIdSchema,
  getHomepageRecipesSchema,
} = require('../schemes/recipe');
const {
  getRecipesController,
  getRecipeByIdController,
  getHomepageRecipesController,
} = require('../controllers/recipe');

module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: getRecipesSchema,
    handler: getRecipesController,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getRecipeByIdSchema,
    handler: getRecipeByIdController,
  });

  fastify.route({
    method: 'GET',
    url: '/homepage-recipes',
    schema: getHomepageRecipesSchema,
    handler: getHomepageRecipesController,
  });

  done();
};
