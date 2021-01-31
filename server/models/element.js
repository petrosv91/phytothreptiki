const mongoose = require('mongoose');

const ElementSchema = mongoose.Schema({
  name: String,
  label: String,
  price: Number,
  formula: Array,
  baseElement: Object,
});

module.exports = mongoose.model('Posts', ElementSchema);
