const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  //I want to "import" the list model and display that within the profile model
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
          ref: 'ListModel'
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = ProfileModel = mongoose.model('ProfileModel', ProfileSchema);