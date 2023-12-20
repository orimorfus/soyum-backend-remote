const axios = require('axios');
const NodeCache = require('node-cache');
const generateQueryString = require('../../utils/queryStringUtils/generateQueryString');

const searchCache = new NodeCache({ stdTTL: 3600000, checkperiod: 120000, maxSize: 100 });

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
      'image',
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

  let result = searchCache.get(queryString);

  if (result) {
    console.log('Response served from cache');
    reply.send(result);
  } else {
    const response = await axios(config);
    const filteredData = response.data.hits.filter(hit => hit.recipe.instructionLines.length > 0);
    result = {
      ...response.data,
      hits: filteredData.map(hit => ({
        ...hit,
        recipe: {
          ...hit.recipe,
          id: hit.recipe.uri.split('#recipe_')[1],
          label: hit.recipe.label.replace(/ Recipe$/, ''),
        },
      })),
    };
    searchCache.set(queryString, result, 3600000);
    reply.send(result);
  }
};

module.exports = getRecipesController;
