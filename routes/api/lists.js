const express = require('express');
const router = express.Router();

//@route: Get api/lists
//@description: Test route 
//@access value: Public 

router.get('/', (req, res) => res.send('Lists router'));

//create a list (post request)

//update the name of the list (put request)

//add a book to a list (post request)

//remove a book from a list (delete request)

//rate a book on your list (put request)

//delete a list (delete request)



module.exports = router; 