const express = require('express');
const router = express.Router();
const { studentSigninController, studentUpdateController} = require("../controllers/studentController");
const {verifyToken,isStudent} = require("../middleware/authentication");

// login route
router.post("/Signin", studentSigninController)

// update route
router.put("/edit/:id", studentUpdateController);

router.get("/stu-auth",verifyToken,isStudent, (req,res) =>{
    return res.status(200).send({ok : true});
})


module.exports = router;