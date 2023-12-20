const {User}=require('../db/index');

function userMiddleware(req, res, next) {
    if((!req.headers.username)|| (!req.headers.password)){
        res.status(500).json({message: 'Incomplete heards'})
    }
    const username = req.headers.username;
    const password = req.headers.password;

    const found= User.findOne({username:username,password:password})

    if(!found){
        res.status(404).json({message: 'User not found'})
    }
    next() 
}

module.exports = userMiddleware;