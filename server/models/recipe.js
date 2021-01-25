const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  code: Number,
  recipe: String,
  date: String,
  type: String,
  restPrice: Number,
  totalWeights: Number,
  elements: Array,
  products: Array,
});

module.exports = mongoose.model('Recipes', RecipeSchema);
