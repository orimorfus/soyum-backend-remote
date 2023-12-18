const { getRecipesSchema } = require('../schemes/recipe');
const { getRecipesController } = require('../controllers/recipe');

module.exports = (fastify, opts, done) => {
  fastify.route({
    method: 'GET',
    url: '/search',
    schema: getRecipesSchema,
    handler: getRecipesController,
  });

  done();
};
