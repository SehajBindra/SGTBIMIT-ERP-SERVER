const express = require("express");
const router = express.Router();
const { adminCreateController, facultyCreateController, StudentCreateController, superAdminCreateController, displaysuperavatar } 
= require("../controllers/superAdminController");
const issuperAdmin = require("../middleware/authmiddleware");
const formidable = require('express-formidable');


//superAdmin-create
router.post("/superAdmin-create", formidable(), superAdminCreateController);

//superAdmin-avatardisplay
router.get("/superAdmin-avatardisplay", displaysuperavatar);

//Admin-create
router.post("/Admin-create", issuperAdmin, formidable(), adminCreateController);

//Faculty-create
router.post("/Faculty-create", issuperAdmin, formidable(), facultyCreateController);

//Student-create
router.post("/Student-create", issuperAdmin, formidable(), StudentCreateController);



module.exports = router;