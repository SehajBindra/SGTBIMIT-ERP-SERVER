const express = require('express');
const router = express.Router();
const {facultySignupCintroller, facultySigninCintroller, facultyupdateController} = require("../controllers/facultyController");


//register
router.post("/Signup", facultySignupCintroller)

//login
router.post("/Signin", facultySigninCintroller)

// //FacultySubjects
// router.post("/Subjects", facultySubjectsController)

// //StudentAttendance
// router.post("/markattendance", facultyMarkAttendance)

//facultyupdateController
router.post("/facultyupdate", facultyupdateController)

module.exports = router;