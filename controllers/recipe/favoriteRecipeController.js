const { User } = require('../../models');

const favoriteRecipeController = async (request, reply) => {
  const { id } = request.params; // the unique part of the uri
  const userId = request.user.id; // get user ID from the request

  const user = await User.findById(userId);

  if (!user.favoriteRecipes.includes(id)) {
    user.favoriteRecipes.push(id);
    await user.save();
  }

  return user;
};

module.exports = favoriteRecipeController;
