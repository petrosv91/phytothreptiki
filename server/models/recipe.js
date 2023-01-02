const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
  code: Number,
  recipe: String,
  date: String,
  type: String,
  file: Object,
  restPrice: Number,
  elements: Array,
  products: Array,
});

module.exports = mongoose.model('Recipes', RecipeSchema);
