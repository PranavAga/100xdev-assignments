const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function userMiddleware(req, res, next) {
    // Implement user auth logic
    const auth=req.headers.authorization;
    const start="Bearer "
    if((!auth) || (auth.length<start.length+1) ||(auth.substr(0,start.length)!=start)){
        console.log("|"+auth.substr(0,start.length)+"|")
        console.log("|"+start+"|")
        return res.status(500).json({message:"Invalid headers"});
    }

    if(jwt.verify(auth.substr(start.length),dotenv.parsed.JWT_PASS,(err,decoded)=>{
        if(err){
            return false;
        }
        res.locals.decoded=decoded
        return true;
    })){
        next()
    }
    else{
        return res.status(500).json({message:"Invalid tokens"});
    }
}

module.exports = userMiddleware;