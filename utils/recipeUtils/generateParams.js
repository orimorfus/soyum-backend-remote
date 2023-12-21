module.exports = request => {
  const { keyword, mealType, random, imageSize, diet, health, cuisineType, dishType } =
    request.query;

  const params = {
    type: 'public',
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

  return params;
};
