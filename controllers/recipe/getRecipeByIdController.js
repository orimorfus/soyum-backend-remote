const axios = require('axios');

const getRecipeByIdController = async (request, reply) => {
  const { id } = request.params;

  const config = {
    method: 'get',
    url: `https://api.edamam.com/api/recipes/v2/by-uri?type=public&uri=http%3A%2F%2Fwww.edamam.com%2Fontologies%2Fedamam.owl%23recipe_${id}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`,
  };

  const response = await axios(config);
  reply.send(response.data);
};

module.exports = getRecipeByIdController;
