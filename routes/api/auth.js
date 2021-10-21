const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserModel = require('../../Models/UserModel');

//@route: Get api/auth
//@description: Authenticate a user 
//@access value: Public 

router.get('/', auth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).select('-password');
        res.json(user);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});

module.exports = router; 