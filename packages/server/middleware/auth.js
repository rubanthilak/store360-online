require("dotenv").config();
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denited. No token provide');

    try{
        const decode = jwt.verify(token,config.get('jwtPrivateKey'));
        req.user = decode;
        next();
    }
    catch(ex){
        res.status(400).send("Invalid token");
    }
}

module.exports = auth;