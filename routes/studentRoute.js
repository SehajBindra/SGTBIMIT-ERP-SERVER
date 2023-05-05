const express = require('express');
const router = express.Router();
const multer = require("multer");
const {studentSignupController, studentSigninController, studentUpdateController, protectedRoute, studentRemoveController} = require("../controllers/studentController");
const isAdmin = require("../middleware/authmiddleware");

// File upload using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'studentAvatars/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

// register
router.post("/Signup", upload.single('avatar'), studentSignupController);

// login route
router.post("/Signin", studentSigninController)

// update route
router.put("/edit/:id", studentUpdateController);

// delete a student
router.delete("/delete/:id", studentRemoveController)

//test
router.get("/test", isAdmin, protectedRoute);

module.exports = router;