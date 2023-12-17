const {
  recipeSearchSchema,
  saveRecipeSchema,
  favoriteRecipeSchema,
  recipeCategorySearchSchema,
  getRecipeSchema,
} = require('../schemes/recipe');
const {
  recipeSearchController,
  saveRecipeController,
  recipeCategorySearchController,
  getRecipeController,
  favoriteRecipeController,
  unfavoriteRecipeController,
} = require('../controllers/recipe');

const { accessTokenMiddleware } = require('../middleware');

module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: recipeSearchSchema,
    handler: recipeSearchController,
  });

  fastify.route({
    method: 'GET',
    url: '/search/:category',
    schema: recipeCategorySearchSchema,
    handler: recipeCategorySearchController,
  });

  fastify.route({
    method: 'POST',
    url: '/save',
    schema: saveRecipeSchema,
    handler: saveRecipeController,
  });

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: getRecipeSchema,
    handler: getRecipeController,
  });

  fastify.route({
    method: 'POST',
    url: '/:id/favorite',
    schema: favoriteRecipeSchema,
    preHandler: accessTokenMiddleware,
    handler: favoriteRecipeController,
  });

  fastify.route({
    method: 'DELETE',
    url: '/recipes/:id/favorite',
    schema: favoriteRecipeSchema,
    preHandler: accessTokenMiddleware,
    handler: unfavoriteRecipeController,
  });

  done();
};
