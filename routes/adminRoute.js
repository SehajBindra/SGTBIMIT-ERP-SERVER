const express =  require('express');
const router = express.Router();
const isAdmin = require('../middleware/authmiddleware');
const {adminSigninController, adminSignupController,AdminStudentAdd,adminaddfaculty} = require('../controllers/adminController');
const formidable = require('express-formidable');

//register
router.post("/Signup",adminSignupController);


//login
router.post("/Signin", isAdmin, adminSigninController);

//Student Register
router.post("/Student_Add",formidable(), AdminStudentAdd);

//Faculty Register
router.post("/Faculty_Add",formidable(),adminaddfaculty);

module.exports = router;