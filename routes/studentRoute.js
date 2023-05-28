const express = require('express');
const router = express.Router();
const { studentSigninController, studentUpdateController,StudentTimeTableGet ,StudentDataDetail,StudentImageGet } = require("../controllers/studentController");
const { verifyToken, isStudent } = require("../middleware/authentication");

// login route
router.post("/Signin", studentSigninController)

// update route
router.put("/edit/:id", studentUpdateController);

//Student Data get 
router.get("/Student_Get", verifyToken, isStudent, StudentDataDetail)

//Student Image Get 
router.get("/Student_Image/:_id",StudentImageGet)

//Student Time Table Get
router.post("/Student_Time_Table",verifyToken,StudentTimeTableGet)

router.get("/stu-auth", verifyToken, isStudent, (req, res) => {
    return res.status(200).send({ ok: true });
})


module.exports = router; 