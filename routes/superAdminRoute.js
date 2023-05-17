const express = require("express");
const router = express.Router();
const { adminCreateController,displaysuperavatar } 
= require("../controllers/superAdminController");
const formidable = require('express-formidable');
const {verifyToken,isSuperAdmin} = require("../middleware/authentication")


//superAdmin-create
// router.post("/superAdmin-create", formidable(), superAdminCreateController);

//superAdmin-avatardisplay
router.get("/superAdmin-avatardisplay",verifyToken,isSuperAdmin, displaysuperavatar);

//Admin-create
router.post("/Admin-create",verifyToken,isSuperAdmin,formidable(), adminCreateController);





module.exports = router;