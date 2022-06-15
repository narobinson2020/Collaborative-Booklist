const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const UserModel = require('../../Models/UserModel');

const config = require('config');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//@route: Get api/auth
//@description: Test route
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

//@route: Post api/auth
//@description: Authenticate a user & get their token
//@access value: Public
router.post(
  '/',
  [
    //these are checks to make sure the user's account exists
    check('email', 'Please include a valid Email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    //console.log(req.body); --> this is the object of data that will be sent to this route
    //this says that if there are any errors (user doesn't enter one of the fields correctly) then the appropriate validatior message (set up in the checks above) will be sent back
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body; //this pulls the information we need to register each user from req.body object

    try {
      //need to check to make sure the user exists
      let user = await UserModel.findOne({ email });
      //if the account doesn't exists, the user will get the following error message when trying to log in
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid credentials' }] });
      }

      //This will make sure that the password entered matches the user's account
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ message: 'Invalid credentials' }] });
      }

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
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
