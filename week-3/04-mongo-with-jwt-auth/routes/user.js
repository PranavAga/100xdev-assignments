const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const bodyParser = require('body-parser');
const {User,Course}=require('../db/index');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    User.create({
        username: req.body.username,
        password: req.body.password
    });
    
    return res.status(200).json({message: 'User created successfully' })
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    if((!req.body.username)|| (!req.body.password)){
        res.status(500).json({message: 'Incomplete body'})
    }
    const username = req.body.username;
    const password = req.body.password;

    const found= await User.findOne({username:username,password:password})

    if(!found){
        return res.status(404).json({message: 'User not found'})
    }

    const token=jwt.sign(username,dotenv.parsed.JWT_PASS);

    res.status(200).json({token:token});
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses=await Course.find();

    console.log(courses)
    res.status(200).json({
        courses:courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const course=await Course.findOne({_id: req.params.courseId});

    if(!course){
        return res.status(404).json({message: "invalid courseID"})
    }

    const user=await User.findOne({username:res.locals.decoded});

    user.purchased.push(course._id);
    user.save();

    res.status(200).json({message: 'Course purchased successfully'})
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const user=await User.findOne({username:req.headers.username,password:req.headers.password});

    const courses=[]
    for(const c of user.purchased){
        const pc=await Course.findById(c._id)
        courses.push(pc)
    }

    res.status(200).json({purchasedCourses:courses})
});

module.exports = router;