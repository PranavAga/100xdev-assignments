const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
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
        return true;
    })){
        next()
    }
    else{
        return res.status(500).json({message:"Invalid tokens"});
    }
}

module.exports = adminMiddleware;