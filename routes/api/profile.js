const express = require('express');
const router = express.Router();

const auth = require('../../Middleware/auth');
const ProfileModel = require('../../Models/ProfileModel');
//const UserModel = require('../../Models/user');

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

module.exports = router; 