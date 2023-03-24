const express = require('express');
const router = express.Router();
const {studentSignupController} = require("../controllers/studentController");



router.post("/Signup", studentSignupController);



module.exports = router;