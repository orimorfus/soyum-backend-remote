const { Recipe } = require('../../models');

const saveRecipeController = async (request, reply) => {
  const recipeData = request.body;
  const recipe = new Recipe(recipeData);
  const savedRecipe = await recipe.save();
  return savedRecipe;
};

module.exports = saveRecipeController;
