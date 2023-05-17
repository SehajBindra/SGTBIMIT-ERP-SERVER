const express = require('express');
const router = express.Router();
const { studentSigninController, studentUpdateController} = require("../controllers/studentController");

// login route
router.post("/Signin", studentSigninController)

// update route
router.put("/edit/:id", studentUpdateController);


module.exports = router;