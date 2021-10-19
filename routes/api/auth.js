const express = require('express');
const router = express.Router();

//@route: Get api/auth
//@description: Test route 
//@access value: Public 

router.get('/', (req, res) => res.send('Auth router'));

module.exports = router; 