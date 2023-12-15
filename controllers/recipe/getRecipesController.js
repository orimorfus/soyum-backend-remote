const axios = require('axios');

const getRecipesController = async (request, reply) => {
  const { keyword, fromNumResults, toNumResults } = request.query;
  const appId = '18267148';
  const appKey = '0d72d7631756483fe2394fb6c5f39c7e';
  const response = await axios.get(
    `https://api.edamam.com/search?q=${keyword}&app_id=${appId}&app_key=${appKey}&from=${fromNumResults}&to=${toNumResults}`
  );
  return response.data.hits;
};

module.exports = getRecipesController;
