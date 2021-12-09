const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  contributors: [
    {
      type: Schema.Types.ObjectId,
      ref: 'UserModel',
    },
  ],
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      title: {
        type: String,
        required: true,
      },
      author: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      //this creates a 1-5 rating system for each book in the list
      rating: {
        type: mongoose.Mixed,
        // A mixed type object to handle ratings. Each star level is represented in the ratings object
        1: Number, //the key is the weight of that star level
        2: Number,
        3: Number,
        4: Number,
        5: Number,
        default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ListModel = mongoose.model('ListModel', ListSchema);
