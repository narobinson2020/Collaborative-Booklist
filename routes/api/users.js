const express = require('express');
const router = express.Router();
const gravatar = require('gravatar'); //not sure if I want to use gravatar or not
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//this will allow you to create validation for users such as when the password doesn't meet certain requirements, an email is ommitted, etc.
const { check, validationResult } = require('express-validator');

//import the user model for registartion
const UserModel = require('../../Models/UserModel');

//@route: Post api/users
//@description: Register user
//@access value: Public

router.post(
  '/',
  [
    //these are checks to make sure that the user fills out the fields you set up in models/user.js
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password must have 6 or more characters').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    //this says that if there are any errors (user doesn't enter one of the fields correctly) then the appropriate validatior message (set up in the checks above) will be sent back
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body; //this pulls the information we need to register each user from req.body object

    try {
      //need to check to make sure the user exists
      let user = await UserModel.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] });
      }
      //get the user's gravatar for the associated email
      const avatar = gravatar.url(email, {
        s: '200', //size of the image
        r: 'pg', //image rating
        d: 'mm', //default image for the profile icon
      });

      //instance of a new user. this doesn't save a user, just creates an instance
      user = new UserModel({
        name,
        email,
        password,
        avatar,
      });

      //encrypt the password
      //Reminder: anything that returns a promise, you must put 'await' in front of it when using async and await.
      //Otherwise, you must use .then()
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();
      //return the jsonwebtoken so the user can be logged in right away
      const payload = {
        user: {
          id: user.id, //even though mongoDB has '_id' as the object id, mongoose uses an abstraction
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(error.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
