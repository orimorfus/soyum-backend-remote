const axios = require('axios');
const generateQueryString = require('../../utils/queryStringUtils/generateQueryString');

const getRecipesController = async (request, reply) => {
  const { keyword, mealType, random, imageSize } = request.query;

  const params = {
    q: '',
    type: 'any',
    random,
    app_id: process.env.EDAMAM_APP_ID,
    app_key: process.env.EDAMAM_APP_KEY,
    imgSize: imageSize,
    field: ['uri', 'label', 'image', 'images', 'ingredients'],
  };

  if (mealType) params.mealType = mealType;
  if (keyword) params.q = keyword;

  const queryString = generateQueryString(params);

  const config = {
    method: 'get',
    url: `https://api.edamam.com/api/recipes/v2?${queryString}`,
  };

  console.log(config.url);

  const response = await axios(config);
  reply.send(response.data);
};

module.exports = getRecipesController;
