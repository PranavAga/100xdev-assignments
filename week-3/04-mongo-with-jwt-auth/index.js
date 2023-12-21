const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user");
const {mongoose } = require('mongoose');
const dotenv = require('dotenv').config()

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/admin", adminRouter)
app.use("/user", userRouter)

const PORT=dotenv.parsed.PORT
app.listen(PORT?PORT:3000, () => {
    console.log(`Server is running on port ${PORT?PORT:3000}`);
    // Connect to MongoDB
    mongoose.connect(dotenv.parsed.MONGO_URL);
});
