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
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('list', ListSchema);
