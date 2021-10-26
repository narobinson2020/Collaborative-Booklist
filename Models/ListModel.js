const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  lists: [
    {
      name: {
        type: String,
        required: true,
      },
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
      //add object that shows an array of all users contributing to the list 
      //verify that this works!!!
      contributors: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserModel'
      }],
      //need to do some sort of 1-5 star rating for each book
      rating: {
        
      }
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ListModel = mongoose.model('ListModel', ListSchema);
