const express = require('express');
const router = express.Router();
const {studentSignupController, StudentSigninController} = require("../controllers/studentController");


// register
router.post("/Signup", studentSignupController);

//login
router.post("/Signin", StudentSigninController)


module.exports = router;