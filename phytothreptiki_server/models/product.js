const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: String,
  label: String,
});

module.exports = mongoose.model('Products', ProductSchema);
