// Dependencies
const mongoose = require('mongoose');

// Creating Model for Search list
const List = mongoose.model('List', new mongoose.Schema({
  value: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
}));

// Export the module
module.exports.List = List;
