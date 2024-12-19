const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  foodName: {
    type: String,
    required: true
  },
  bodyWeight: {
    type: String,
    required: true
  },
  mealsPer: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, {timestamps: true})

module.exports = mongoose.model('food', foodSchema)