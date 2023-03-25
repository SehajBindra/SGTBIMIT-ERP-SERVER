const express = require('express');
const router = express.Router();
const {studentSignupController, StudentSigninController} = require("../controllers/studentController");


// register
router.post("/Signup", studentSignupController);

//login route
router.post("/Signin", StudentSigninController)
// try
// {
//     const {username, password} = req.body;

//     if(!username || !password){
//         return res.status(400).json({error:'Plz Filled the data'})
//     }

//     const studentlogin = await user.findone({username:username});

//     // console.log(studentLogin);

//     if(studentlogin) {
//         const isMatch = await bcrypt.compare(password, studentlogin.password);

//         const token = await. studentlogin.Token();
//         console.log(Token);
//     }
//     if(!isMatch) {
//         const Match = await bcrypt.compare(password, studentlogin.password);
//     }else{
//         res.json({message: "Student Sigin Succesfully"});
//     }
//     // else{
//     //     res.status(400).json({ error: "Invalid Credentials"});
//     // }
// }
//     catch(err){
//         console.log(err);
//     }

module.exports = router;