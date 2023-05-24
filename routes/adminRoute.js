const express =  require('express');
const router = express.Router();
const {adminSigninController,AdminStudentAdd,MultipleStudentsAdd,FacultyAdd,StudentDelete} = require('../controllers/adminController');
const formidable = require('express-formidable');
const {verifyToken,isAdminsRoleCheck,isAdmin} = require("../middleware/authentication");
const {SemesterPromote} = require("../controllers/semesterController");
const {AllSubjectAdd,TeacherSubjectSelect} = require("../controllers/allSubjectController");

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

//Semester Permote 
router.patch("/Semester_Permote/:semNumber",SemesterPromote)

//All Subject Add 
router.post("/All_Subject_Add",AllSubjectAdd);

//Teacher Subject Add
router.post("/Teacher_Subject_Select",TeacherSubjectSelect);

router.get("/admin-auth",verifyToken,isAdmin, (req,res) =>{
    return res.status(200).send({ok : true});
})


module.exports = router;