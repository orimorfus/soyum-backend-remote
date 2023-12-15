module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: require('../schemes/recipe/recipeSchema'),
    handler: require('../controllers/recipe/getRecipesController'),
  });

  done();
};
