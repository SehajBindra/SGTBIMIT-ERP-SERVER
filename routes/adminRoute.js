const express =  require('express');
const router = express.Router();
const isAdmin = require('../middleware/authmiddleware');
const {adminSigninController,AdminStudentAdd,MultipleStudentsAdd,FacultyAdd} = require('../controllers/adminController');
const formidable = require('express-formidable');

//login
router.post("/Signin", isAdmin, adminSigninController);

//Student Register
router.post("/Student_Add",formidable(), AdminStudentAdd);

//Multiple Students Add 
router.post("/Multiple_Student_Add",formidable(),MultipleStudentsAdd)

//Faculty Add 
router.post("/Faculty_Add",formidable(),FacultyAdd);

module.exports = router;