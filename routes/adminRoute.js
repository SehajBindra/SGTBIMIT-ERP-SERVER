const express =  require('express');
const router = express.Router();
const isAdmin = require('../middleware/authmiddleware');
const {adminSigninController, adminSignupController} = require('../controllers/adminController');


//register
router.post("/Signup", adminSignupController);


//login
router.post("/Signin", isAdmin, adminSigninController);


module.exports = router;