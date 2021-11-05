const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const ProfileModel = require('../../Models/ProfileModel');
const ListModel = require('../../Models/ListModel');
const RatingsModel = require('../../Models/RatingsModel');
const { check, validationResult } = require('express-validator');

// @route    GET api/lists
// @desc     Get all lists
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const lists = await ListModel.find().sort({ date: -1 });
    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/lists/:id
// @desc     Get list by ID
// @access   Private
router.get('/:id', auth, async (req, res) => {
  try {
    //this will get a list by its id
    const list = await ListModel.findById(req.params.id);

    //check to see if that list exists
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    res.status(500).send('Server Error');
  }
});

//@route: Post api/lists
//@description: Create a list
//@access value: Private
router.post(
  '/',
  [
    auth,
    [
      //when creating a post, the route will check that the following field is filled in
      check('name', 'Your list must have a name').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //this says that "if there are errors (missing status and skill fields), then it will return one or both of the errors defined in your checks"
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //returns an empty list array with an id 
    try {

      //this looks for the profile matched to the user's id. ".select('-password')" will make sure that the password isn't apart of each request
      const profile = await ProfileModel.findOne({user: req.user.id}).select('-password');

      const newList = new ListModel({
        creator: profile.creator, //issue matching user defined on line 72 with the creator defined here
        name: req.body.name,
        title: req.body.title,
        author: req.body.author,
        rating: req.body.rating, 
      });

      //this will push the new list on to the array of lists.
      //By using the unshift() method, the latest list will show first
      profile.lists.unshift(newList);

      //saves the new list to the profile
      const list = await newList.save();

      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//add a book to a list (put request)
//@route: Put api/lists/book
//@description: Add a book to list
//@access value: Private

router.put(
  '/book',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('author', 'Author is required').notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const profile = await ProfileModel.findOne({ user: req.user.id });

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

//remove a book from a list (delete request)

//rate a book on your list (put request)

//delete a list (delete request)
//@route: Delete api/profile/lists/:list_id <-- double check that this id notation is correct for lists
//@description: Delete a list from the user's profile
//@access value: Private

module.exports = router;
