const mongoose = require('mongoose');

const CodeSchema = mongoose.Schema({
  code: Number,
});

module.exports = mongoose.model('Codes', CodeSchema);
