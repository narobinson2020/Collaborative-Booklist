const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //Get the token from header. when you send a token through a protected route, you need to send the request within a header
    const token = req.header('x-auth-token'); //this is the header key that you want to send the token in

    //check if there is no token 
    if(!token) {
        return res.status(401).json({message: 'No token, authorization denied'});
    }

    //Verify the token if it exists
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret')); //this will decode the token if it exists 
        req.user = decoded.user; //this assigns the token to the user it belongs to
        next();
    } catch(err) {
        res.status(401).json({message: 'Token is not valid'});
    }
};