const express =  require('express');
const router = express.Router();
const isAdmin = require('../middleware/authmiddleware');
const {adminSigninController, adminSignupController,AdminStudentAdd,MultipleStudentsAdd} = require('../controllers/adminController');
const formidable = require('express-formidable');

//register
router.post("/Signup",adminSignupController);


//login
router.post("/Signin", isAdmin, adminSigninController);

//Student Register
router.post("/Student_Add",formidable(), AdminStudentAdd);


//Multiple Students Add 
router.post("/Multiple_Student_Add",formidable(),MultipleStudentsAdd)

module.exports = router;