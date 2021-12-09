const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  username: {
    type: String,
    required: true
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: 'ListModel'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProfileModel = mongoose.model('ProfileModel', ProfileSchema);