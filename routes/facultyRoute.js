const express = require('express');
const router = express.Router();
const { facultySigninCintroller, facultyupdateController, facultyRemoveController} = require("../controllers/facultyController");
const {verifyToken,isFaculty} = require("../middleware/authentication");

//login
router.post("/Signin", facultySigninCintroller)

// //FacultySubjects
// router.post("/Subjects", facultySubjectsController)

//facultyupdateController
router.post("/facultyupdate", facultyupdateController)

//facultyRemove
router.delete("/facultyRemove", facultyRemoveController)

router.get("/facu-auth",verifyToken,isFaculty, (req,res) =>{
    return res.status(200).send({ok : true});
})

module.exports = router;