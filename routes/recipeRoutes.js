const { recipeSearchSchema } = require('../schemes/recipe');
const { recipeSearchController } = require('../controllers/recipe');

module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: recipeSearchSchema,
    handler: recipeSearchController,
  });

  done();
};
