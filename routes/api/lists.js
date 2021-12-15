const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const ProfileModel = require('../../Models/ProfileModel');
const ListModel = require('../../Models/ListModel');
const UserModel = require('../../Models/UserModel');
//const RatingsModel = require('../../Models/RatingsModel');
const { check, validationResult } = require('express-validator');
//const axios = require('axios');


//@route: Post api/lists
//@description: Create a list
//@access value: Private
router.post(
  '/',
  [
    auth,
    [
      //when creating a list, the route will check that the following field is filled in
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
      const profile = await ProfileModel.findOne({ user: req.user.id }).select(
        '-password'
      );

      const newList = new ListModel({
        creator: profile.id,
        contributors: profile.id,
        name: req.body.name,
        books: req.body.books //not sure if this is correct
      });

      //this will push the new list on to the array of lists.
      //By using the unshift() method, the latest list will show first
      profile.lists.unshift(newList);

      //saves the new list
      await newList.save(); 

      res.json(profile);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    GET api/lists
// @desc     Get all lists for that user
// @access   Private
// may not need this route. Getting the user's profile should return their lists as well
router.get('/', auth, async (req, res) => {
  try {

    //const lists = await ListModel.find().sort({ date: -1 });

    const lists = await ListModel.find().populate('ListModel', ['name','lists']).sort({ date: -1 });

    if (!lists) {
      res.status(400).json({ message: 'There are no lists for this user' });
    }

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

    console.log(list);

    //check to see if that list exists
    if (!list) {
      return res.status(404).json({ msg: 'List not found' });
    }

    res.json(list);
  } catch (err) {
    console.error(err.message);

    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'List not found' });
    }

    res.status(500).send('Server Error');
  }
});


//@route: Put api/lists/book
//@description: Add a book to list (put request)
//@access value: Private

//this will pull books from an api
//Just want to test if the route works for manually inputing a book
router.put(
  '/books',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('author', 'Author is required')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);

    //this says that "if there are errors (missing title, company or from date fields), then it will return one or both of the errors defined in your checks"
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, description, rating } = req.body;

    //this will create an object with the data the user submits for new experiences
    const newBook = {
      title,
      author,
      description,
      rating,
    };

    try {
      //this looks for the profile matched to the user's id
      const profile = await ProfileModel.findOne({ user: req.user.id });

      //this will look for the list that you are trying to add a book to
      const list = await ListModel.findById({ list: req.list.id });

      //this will push new books on to the array of books. By using the unshift() method, latest book will show first
      //make sure that this will push the book to the correct list
      list.books.unshift(newBook);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


//@route: Delete api/lists/books
//@description: remove a book from your list 
//@access value: Private


//@route: Put api/lists/
//@description: Rate a book on your list 
//@access value: Private


//@route: Put api/lists/
//@description: Add a contributor to a list 
//@access value: Private


//@route: Delete api/lists/
//@description: Remove a contributor from a list 
//@access value: Private


//@route: Delete api//lists/:id 
//@description: Delete a list from the user's profile
//@access value: Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //this will get a posts by its id
    const list = await ListModel.findById(req.params.id);

    //check to make sure the user that deletes a post is the author of that post
    //"list.user" by itself is an object and "req.user.id" is a string so you need to add the ".toString()" method so you get a correct comparison
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({ mesage: 'User not authorized to delete this list' });
    } else {
      await list.remove();
    }

    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'List does not exist' });
    }
    res.status(500).send('Server Error');
  }
});


module.exports = router;
