const express = require('express');
const router = express.Router();
const auth = require('../../Middleware/auth');
const ProfileModel = require('../../Models/ProfileModel');
const ListModel = require('../../Models/ListModel');
const UserModel = require('../../Models/UserModel');
//const RatingsModel = require('../../Models/RatingsModel');
const BooksModel = require('../../Models/BooksModel');
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
    //const lists = await ListModel.find().populate(['name', 'id']).sort({ date: -1 });

    const lists = await ListModel.find().sort({ date: -1 });

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
    const list = await ListModel.findById(req.params.id);

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
//books are created and show in database but aren't displaying within the books array in the ListModel
router.put(
  '/books',
  auth,
  check('title', 'Title is required').notEmpty(),
  check('author', 'Author is required')
    .notEmpty()
    .custom((value, { req }) => (req.body.to ? value < req.body.to : true)),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try { 
      const user = await UserModel.findById(req.user.id).select('-password');

      //create a new book 
      const newBook = new BooksModel({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        rating: req.body.rating,
        creator: user.id
      });

      //save the new book to the list 
      const list = await newBook.save()

      //return the list 
      res.json(list);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);


//@route: Delete api/lists/books/:id
//@description: delete a book from your list 
//@access value: Private
router.delete('/books/:id', auth, async (req, res) => {
  try {
    const book = await BooksModel.findById(req.params.id);

    //check to make sure the user that deletes a book is the one that put the book there
    //"book.user" by itself is an object and "req.user.id" is a string so you need to add the ".toString()" method so you get a correct comparison
    //user is undefined
    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    } else {
      await book.remove();
    }

    res.json({ message: 'Book deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Book does not exist' });
    }
    res.status(500).send('Server Error');
  }
});


//@route: Put api/lists/rating
//@description: Rate a book on your list 
//@access value: Private


//@route: Put api/lists/contributor
//@description: Add a contributor to a list 
//@access value: Private


//@route: Delete api/lists/contributor/:id
//@description: Remove a contributor from a list 
//@access value: Private


//@route: Delete api//lists/:id 
//@description: Delete a list from the user's profile
//@access value: Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const list = await ListModel.findById(req.params.id);

    //check to make sure the user that deletes a list is the author of that list
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
