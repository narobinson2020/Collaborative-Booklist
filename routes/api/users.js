const express = require('express');
const router = express.Router();

//@route: Get api/users
//@description: Test route 
//@access value: Public 

router.get('/', (req, res) => res.send('Users router'));

module.exports = router; 