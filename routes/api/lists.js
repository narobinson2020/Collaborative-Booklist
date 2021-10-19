const express = require('express');
const router = express.Router();

//@route: Get api/lists
//@description: Test route 
//@access value: Public 

router.get('/', (req, res) => res.send('Lists router'));

module.exports = router; 