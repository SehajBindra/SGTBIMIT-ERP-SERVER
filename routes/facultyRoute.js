const express = require('express');
const router = express.Router();
const multer = require("multer");
const { facultySigninCintroller, facultyupdateController, facultyRemoveController} = require("../controllers/facultyController");
const isAdmin = require("../middleware/authmiddleware");


//login
router.post("/Signin", facultySigninCintroller)

// //FacultySubjects
// router.post("/Subjects", facultySubjectsController)

//facultyupdateController
router.post("/facultyupdate", facultyupdateController)

//facultyRemove
router.delete("/facultyRemove", facultyRemoveController)

module.exports = router;