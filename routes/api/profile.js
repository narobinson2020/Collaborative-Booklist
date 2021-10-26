const express = require('express');
const router = express.Router();

const auth = require('../../Middleware/auth');
const ProfileModel = require('../../Models/ProfileModel');
const UserModel = require('../../Models/UserModel');
const { check, validationResult } = require('express-validator');

//@route: Get api/profile/me
//@description: Get the current user's profile
//@access value: Private

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await ProfileModel.findOne({ user: req.user.id }) //"user: req.user.id" will associate the user that signs in with their profile via the json web token
      .populate('user', ['name', 'avatar']); //this will populate each user with their associated name and avatar

    if (!profile) {
      res.status(400).json({ message: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//@route: Post api/profile
//@description: Create or update a user profile
//@access value: Private

router.post(
  '/',
  [
    auth,
    [
      //when creating or updating a profile, the route will check that these fields are filled in
      check('username', 'Username is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //this says that "if there are errors (missing status and skill fields), then it will return one or both of the errors defined in your checks"
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, lists } = req.body;

    //Build the profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (username) profileFields.username = username;
    if (email) profileFields.email = email;

    //this will turn the skills listed into an array.
    //.split will turn the string of skills into an array
    //the .map will take each skill in the array and remove any whitespace before or after the skill
    if (lists) {
      profileFields.lists = lists.split(',').map((list) => list.trim());
    }
    try {
      //this looks for the profile matched to the user's id
      let profile = await ProfileModel.findOne({ user: req.user.id });

      //if the profile of that user exists, it will update the profile
      if (profile) {
        //This will update the profile
        profile = await ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      //this logic will create a profile if a profile for the user doesn't already exists

      // 1) this creates a new profile
      profile = new ProfileModel(profileFields);

      // 2) saves the newly created profile
      await profile.save();

      // 3) returns the newly created profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//@route: Delete api/profile
//@description: Delete profile, user and lists
//@access value: Private

router.delete('/', auth, async (req, res) => {
  try {
    //@todo- delete a lists
    //double check this!!!
    await ListModel.findOneAndRemove({ _id: req.user.id });

    //this will delete a profile
    await ProfileModel.findOneAndRemove({ user: req.user.id });

    //Remove a user
    await UserModel.findOneAndRemove({ _id: req.user.id });

    res.json({ message: 'User has been removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
