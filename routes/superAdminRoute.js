const express = require("express");
const { adminCreateController, facultyCreateController, StudentCreateController, superAdminCreateController } 
= require("../controllers/superAdminController");
const issuperAdmin = require("../middleware/authmiddleware");
const router = express.Router();


//superAdmin-create
router.post("/superAdmin-create", superAdminCreateController);

//Admin-create
router.post("/Admin-create", issuperAdmin, adminCreateController);

//Faculty-create
router.post("/Faculty-create", issuperAdmin, facultyCreateController);

//Student-create
router.post("/Student-create", issuperAdmin, StudentCreateController);



module.exports = router;