const express = require('express');
const router = express.Router();

//@route: Get api/profile
//@description: Test route 
//@access value: Public 

router.get('/', (req, res) => res.send('Profile router'));

module.exports = router; 