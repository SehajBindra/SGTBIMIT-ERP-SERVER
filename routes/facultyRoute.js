const express = require('express');
const router = express.Router();
const {facultySignupCintroller, facultySigninCintroller} = require("../controllers/facultyController");


//register
router.post("/Signup", facultySignupCintroller)

//login
router.post("/Signin", facultySigninCintroller)

module.exports = router;