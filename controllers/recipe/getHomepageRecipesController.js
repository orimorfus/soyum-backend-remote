const NodeCache = require('node-cache');
const generateQueryString = require('../../utils/queryStringUtils/generateQueryString');
const { generateParams, handleResponse } = require('../../utils/recipeUtils');

const searchCache = new NodeCache({ stdTTL: 120, checkperiod: 60, maxSize: 200 });

const getHomepageRecipesController = async (request, reply) => {
  const params = generateParams(request);
  const queryString = generateQueryString(params);

  const config = {
    method: 'get',
    url: `https://api.edamam.com/api/recipes/v2?${queryString}`,
  };

  await handleResponse(config, queryString, searchCache, reply, 4);
};

module.exports = getHomepageRecipesController;
