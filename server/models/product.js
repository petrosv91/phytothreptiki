const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  label: String,
});

module.exports = mongoose.model('Products', ProductSchema);
