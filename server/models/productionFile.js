const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  date: String,
  productStore: Array,
});

module.exports = mongoose.model('ProductionFile', ProductSchema);
