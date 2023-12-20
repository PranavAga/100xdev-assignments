const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const bodyParser = require('body-parser');
const {Admin,User,Course}=require('../db/index');

router.use(bodyParser.json());

//User Routes
router.post('/signup', async(req, res) => {
    const newuser = new User({
        username: req.body.username,
        password: req.body.password
    });
    
    await newuser.save();
    res.status(200).json({message: 'Admin created successfully' })
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
    const course=await Course.findOne({_id: req.params.courseId});

    if(!course){
        return res.status(404).json({message: "invalid courseID"})
    }

    const user=await User.findOne({username:req.headers.username,password:req.headers.password});

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

module.exports = router