const express = require("express");
const router = express.Router();
const { adminCreateController,displaysuperavatar } 
= require("../controllers/superAdminController");
const issuperAdmin = require("../middleware/authmiddleware");
const formidable = require('express-formidable');


//superAdmin-create
// router.post("/superAdmin-create", formidable(), superAdminCreateController);

//superAdmin-avatardisplay
router.get("/superAdmin-avatardisplay", displaysuperavatar);

//Admin-create
router.post("/Admin-create",  formidable(), adminCreateController);





module.exports = router;