const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  recipe: String,
  date: String,
  type: String,
  loops: Number,
  weights: Number,
  elements: Array,
  products: Array,
});

module.exports = mongoose.model('Recipes', RecipeSchema);
