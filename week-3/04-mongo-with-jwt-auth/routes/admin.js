const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const bodyParser = require('body-parser');
const {Admin,Course}=require('../db/index');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');

router.use(bodyParser.json());

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    Admin.create({
        username: req.body.username,
        password: req.body.password
    })

    res.status(200).json({message: 'Admin created successfully'})
});

router.post('/signin', async(req, res) => {
    // Implement admin signup logic
    if((!req.body.username)|| (!req.body.password)){
        res.status(500).json({message: 'Incomplete body'})
    }
    const username = req.body.username;
    const password = req.body.password;

    const found= await Admin.findOne({username:username,password:password})

    if(!found){
        return res.status(404).json({message: 'Admin not found'})
    }

    const token=jwt.sign(username,dotenv.parsed.JWT_PASS);

    res.status(200).json({token:token});
});

router.post('/courses', adminMiddleware, async(req, res) => {
    // Implement course creation logic

    const {title,description,price,imageLink} = req.body;
    const newcourse= new Course({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })

    await newcourse.save()
    return res.status(200).json({message: 'Course created successfully', courseId: newcourse._id})
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses=await Course.find();

    console.log(courses)
    res.status(200).json({
        courses:courses
    })
});

module.exports = router;