const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const bodyParser = require('body-parser');
const {Admin,User,Course}=require('../db/index');

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

router.post('/courses', adminMiddleware,async (req, res) => {
    const {title,description,price,imageLink} = req.body;
    const newcourse= new Course({
        title:title,
        description:description,
        price:price,
        imageLink:imageLink
    })

    await newcourse.save()

    res.status(200).json({ message: 'Course created successfully', courseId: newcourse._id })
});

router.get('/courses', adminMiddleware, async(req, res) => {
    const courses=await Course.find();

    console.log(courses)
    res.status(200).json({
        courses:courses
    })
});

module.exports = router;