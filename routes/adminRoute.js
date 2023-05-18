const express =  require('express');
const router = express.Router();
const {adminSigninController,AdminStudentAdd,MultipleStudentsAdd,FacultyAdd,StudentDelete} = require('../controllers/adminController');
const formidable = require('express-formidable');
const {verifyToken,isAdminsRoleCheck} = require("../middleware/authentication");

//login
router.post("/Signin", adminSigninController);

//Student Register
router.post("/Student_Add",verifyToken,isAdminsRoleCheck,formidable(), AdminStudentAdd);

//Multiple Students Add 
router.post("/Multiple_Student_Add",verifyToken,isAdminsRoleCheck,formidable(),MultipleStudentsAdd)

//Faculty Add 
router.post("/Faculty_Add",verifyToken,isAdminsRoleCheck,formidable(),FacultyAdd);

//Student Delete 
router.delete("/Student_Delete/:_id",verifyToken,isAdminsRoleCheck,StudentDelete)



module.exports = router;