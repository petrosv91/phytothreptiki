const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  code: Number,
  recipe: String,
  date: String,
  type: String,
  loops: Number,
  weights: Number,
  totalWeight: Number,
  elements: Array,
  products: Array,
});

module.exports = mongoose.model('Recipes', RecipeSchema);
