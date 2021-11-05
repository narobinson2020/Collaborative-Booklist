const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  lists: [
    {
      name: {
        type: String,
        required: true,
      },
      book: [
        {
          title: {
            type: String,
            required: true
          },
          author: {
            type: String,
            required: true
          },
          description: {
            type: String,
          },
          //this created a 1-5 rating system for each book in your list
          rating: { 
              type: mongoose.Mixed,
              // A mixed type object to handle ratings. Each star level is represented in the ratings object
              1: Number, //  the key is the weight of that star level
              2: Number,
              3: Number,
              4: Number,
              5: Number,
              default: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 }
          },
        },
      ],
      //add object that shows an array of all users contributing to the list
      //verify that this works!!!
      contributors: [
        {
          type: Schema.Types.ObjectId,
          ref: 'UserModel',
        },
      ],
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ListModel = mongoose.model('ListModel', ListSchema);
