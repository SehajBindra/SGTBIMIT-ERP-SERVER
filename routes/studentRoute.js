const express = require('express');
const router = express.Router();
const {studentSignupController, StudentSigninController, protectedRoute} = require("../controllers/studentController");
const isAdmin = require("../middleware/authmiddleware");

// register
router.post("/Signup", studentSignupController);

//login route
router.post("/Signin", StudentSigninController)

//test
router.get("/test", isAdmin, protectedRoute);

module.exports = router;