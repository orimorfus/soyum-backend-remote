const axios = require('axios');

const recipeCategorySearchController = async (request, reply) => {
  const { category, fromNumResults, toNumResults } = request.query;
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  const response = await axios.get(
    `https://api.edamam.com/search?q=${category}&app_id=${appId}&app_key=${appKey}&from=${fromNumResults}&to=${toNumResults}`
  );

  const recipes = response.data.hits.map(hit => ({
    uri: hit.recipe.uri,
    label: hit.recipe.label,
    image: hit.recipe.image,
    yield: hit.recipe.yield,
    totalTime: hit.recipe.totalTime,
    instructionLines: hit.recipe.instructionLines,
    ingredients: hit.recipe.ingredients.map(ingredient => ({
      text: ingredient.text,
      quantity: ingredient.quantity,
      measure: ingredient.measure === '<unit>' ? null : ingredient.measure,
      food: ingredient.food,
      weight: ingredient.weight,
      image: ingredient.image,
    })),
  }));

  return recipes;
};
module.exports = recipeCategorySearchController;
