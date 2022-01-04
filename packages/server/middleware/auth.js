require("dotenv").config();
const jwt = require('jsonwebtoken');

function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).send('Access denited. No token provide');

    try{
        const decode = jwt.verify(token,process.env.JWT_PRIVATE_KEY);
        req.user = decode;
        next();
    }
    catch(err){
        res.status(401).json({Message:"Invalid Token"});
    }
}

module.exports = auth;