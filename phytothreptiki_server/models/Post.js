const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  name: String,
  label: String,
  formula: Array,
});

module.exports = mongoose.model('Posts', PostSchema);
