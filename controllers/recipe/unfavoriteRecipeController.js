const { User } = require('../../models');

const unfavoriteRecipeController = async (request, reply) => {
  const { id } = request.params; // the unique part of the uri
  const userId = request.user.id; // assuming you have user info in the request

  const user = await User.findById(userId);

  const index = user.favoriteRecipes.indexOf(id);
  if (index !== -1) {
    user.favoriteRecipes.splice(index, 1);
    await user.save();
  }

  return user;
};

module.exports = unfavoriteRecipeController;
