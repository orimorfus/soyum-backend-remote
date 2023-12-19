const axios = require('axios');
const generateQueryString = require('../../utils/queryStringUtils/generateQueryString');

const getRecipesController = async (request, reply) => {
  const { keyword, mealType, random, imageSize, diet, health, cuisineType, dishType } =
    request.query;

  const params = {
    type: 'any',
    random,
    app_id: process.env.EDAMAM_APP_ID,
    app_key: process.env.EDAMAM_APP_KEY,
    field: [
      'uri',
      'label',
      'images',
      'ingredients',
      'instructionLines',
      'calories',
      'totalWeight',
      'totalTime',
      'yield',
    ],
  };

  if (keyword) params.q = keyword;
  if (mealType) params.mealType = mealType;
  if (diet) params.diet = diet;
  if (health) params.health = health;
  if (cuisineType) params.cuisineType = cuisineType;
  if (dishType) params.dishType = dishType;
  if (imageSize) params.imgSize = imageSize;

  const queryString = generateQueryString(params);

  const config = {
    method: 'get',
    url: `https://api.edamam.com/api/recipes/v2?${queryString}`,
  };

  console.log(config.url);

  const response = await axios(config);

  const filteredData = response.data.hits.filter(hit => hit.recipe.instructionLines.length > 0);

  reply.send({ ...response.data, hits: filteredData });
};

module.exports = getRecipesController;
