const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingsSchema = new Schema({
  name: String,
  ratings: {
    type: mongoose.Mixed,
    // A mixed type object to handle ratings. Each star level is represented in the ratings object
    1: Number, //  the key is the weight of that star level
    2: Number,
    3: Number,
    4: Number,
    5: Number,
    default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
  }
});

//module.exports = RatingsModel = mongoose.model('RatingsModel', ratingsSchema);
