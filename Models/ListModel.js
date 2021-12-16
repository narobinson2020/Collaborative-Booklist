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
      type: Schema.Types.ObjectId,
      ref: 'BooksModel',
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = ListModel = mongoose.model('ListModel', ListSchema);
