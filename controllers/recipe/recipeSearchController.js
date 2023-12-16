const axios = require('axios');

const recipeSearchController = async (request, reply) => {
  const { keyword, fromNumResults, toNumResults } = request.query;
  const appId = process.env.EDAMAN_APP_ID;
  const appKey = process.env.EDAMAN_APP_KEY;
  const response = await axios.get(
    `https://api.edamam.com/search?q=${keyword}&app_id=${appId}&app_key=${appKey}&from=${fromNumResults}&to=${toNumResults}`
  );
  return response.data.hits;
};

module.exports = recipeSearchController;
