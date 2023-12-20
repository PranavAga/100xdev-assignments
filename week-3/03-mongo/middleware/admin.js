const {Admin}=require('../db/index');

// Middleware for handling auth:
function adminMiddleware(req, res, next) {
    if((!req.headers.username)|| (!req.headers.password)){
        res.status(500).json({message: 'Incomplete heards'})
    }
    const username = req.headers.username;
    const password = req.headers.password;

    const found= Admin.findOne({username:username,password:password})

    if(!found){
        res.status(404).json({message: 'Admin not found'})
    }
    next()
}

module.exports = adminMiddleware;