const axios = require('axios');

const getRecipeController = async (request, reply) => {
  const { id } = request.params;
  const appId = process.env.EDAMAM_APP_ID;
  const appKey = process.env.EDAMAM_APP_KEY;
  const response = await axios.get(
    `https://api.edamam.com/search?r=${encodeURIComponent(id)}&app_id=${appId}&app_key=${appKey}`
  );

  const recipe = response.data[0];
  const trimmedRecipe = {
    uri: recipe.uri,
    label: recipe.label,
    image: recipe.image,
    yield: recipe.yield,
    dietLabels: recipe.dietLabels,
    healthLabels: recipe.healthLabels,
    ingredients: recipe.ingredients.map(ingredient => ({
      text: ingredient.text,
      quantity: ingredient.quantity,
      measure: ingredient.measure === '<unit>' ? null : ingredient.measure,
      food: ingredient.food,
      weight: ingredient.weight,
      image: ingredient.image,
    })),
    calories: recipe.calories,
    totalTime: recipe.totalTime,
    instructionLines: recipe.instructionLines,
  };

  return trimmedRecipe;
};

module.exports = getRecipeController;
