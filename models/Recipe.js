const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  uri: {
    type: String,
    required: true,
    unique: true,
  },
  label: {
    type: String,
    required: true,
  },
  image: String,
  source: String,
  url: String,
  yield: Number,
  calories: Number,
  totalWeight: Number,
  dietLabels: [String],
  healthLabels: [String],
  cautions: [String],
  ingredientLines: [String],
  ingredients: [
    {
      text: String,
      quantity: Number,
      measure: String,
      food: String,
      weight: Number,
      foodCategory: String,
      foodId: String,
      image: String,
    },
  ],
  totalTime: Number,
  cuisineType: [String],
  mealType: [String],
  dishType: [String],
  totalNutrients: Schema.Types.Mixed,
  totalDaily: Schema.Types.Mixed,
  digest: Schema.Types.Mixed,
  instructionLines: [String],
  tags: [String],
  favoritedBy: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);
