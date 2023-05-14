const express = require('express');
const router = express.Router();
const multer = require("multer");
const {facultySignupCintroller, facultySigninCintroller, facultyupdateController, facultyRemoveController} = require("../controllers/facultyController");
const isAdmin = require("../middleware/authmiddleware");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'facultyAvatars/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
const upload = multer({ storage: storage })
//register
router.post("/Signup", facultySignupCintroller)

//login
router.post("/Signin", facultySigninCintroller)

// //FacultySubjects
// router.post("/Subjects", facultySubjectsController)

//facultyupdateController
router.post("/facultyupdate", facultyupdateController)

//facultyRemove
router.delete("/facultyRemove", facultyRemoveController)

module.exports = router;