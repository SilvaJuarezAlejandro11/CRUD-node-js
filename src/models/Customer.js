const mongoose = require('mongoose');

const CostumerSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Costumer = mongoose.model('costumer', CostumerSchema);
