const mongoose = require('mongoose');

const CodeSchema = mongoose.Schema({
  code: String,
});

module.exports = mongoose.model('Codes', CodeSchema);
