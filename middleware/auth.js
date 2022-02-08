const jwt = require('jsonwebtoken');
require('dotenv').config();

//Middleware to call wgen processing an authorized URL
let checkJWT = (req, res, next) => {
    console.log('Proccessing JWT authentication check');

    // read the token from the header
    let token;
    if(req.headers.authorization){
        let bearer = req.headers.authorization.split(' ');
        token = bearer[1];
    }else {
        token = null;
    }

    // if the token is not valid there is nothing to check
    if(!token){
        return res.status(401).send("Unauthorized");
    }

    // Verify the token
    let jwtSecret = process.env.JWT_SECRET;
    jwt.verify(token, jwtSecret, (error, decoded) => {
        if(error){
            console.log('could not verify jwt token', error);
            return res.status(401).send("Unauthorized");
        }
        // token is valid, store the username from the token
        // in the request, so that it is avaliable to all following this call
        console.log(decoded);
        req.username = decoded.username;
        req.isAdmin = decoded.role == 'admin';
        // call the next middleware function in the chain
        next();
    });
}

module.exports = { checkJWT }