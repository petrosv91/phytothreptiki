const mongoose = require('mongoose');

const ElementSchema = mongoose.Schema({
  name: String,
  label: String,
  formula: Array,
  baseElement: String,
});

module.exports = mongoose.model('Posts', ElementSchema);
