const facultyModel = require("../models/faculty")
const studentModel = require("../models/student");
// const superAdminModel = require("../models/superAdmin");
const AdminModel = require("../models/admin");
const fs = require("fs");
const emailValidator = require("email-validator");
const { hashPassword } = require("../middleware/authpassword");



// const superAdminCreateController = async (req, res) => {

//   try {

//     const {name, Email, password, department, contactNumber, role} = req.fields;
//     const {avatar} = req.files;

//     if (!name || !Email || !password ||!department || !contactNumber || !avatar) {
//         return res.status(401).send({message : "All fields are required"}); 
//     }
//     if (password.length < 8) {
//         return res.status(401).send({message : "password must be of min 8 characters"});
//     }
//     if (contactNumber.length > 10 || contactNumber.length < 10) {
//         return res.status(400).send({ message: "You have typed wrong phone number" });
//     }
//     if (!emailValidator.validate(Email)) {
//         return res.status(400).send({ message: "Email is not correct" });
//     }


//     const oldsuperAdmin = await superAdminModel.findOne({Email});

//     if (oldsuperAdmin) {
//         return res.status(401).send({message : "You are already superAdmin kindly login"});
//     }

//     const hashedpassword = await hashPassword(password);

//     const superadmins = await new superAdminModel({
//       name,
//       Email,
//       password: hashedpassword,
//       department,
//       contactNumber,
//       avatar,
//       role,
//   });


//     if (avatar) {
//           superadmins.avatar.data = fs.readFileSync(avatar.path),
//           superadmins.avatar.contentType = avatar.type
         
//     }


//     const final = await superadmins.save();

//     return res.status(200).send({
//         success: true,
//         message : "superAdmin Register Successfully",
//         final, 
//     });


    
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in Registration",
//       error,
//     });
//   }
// };


const displaysuperavatar = async(req,res) => {
  try {
        
    const avatar_display = await superAdminModel.find().select('avatar');
    return res.status(201).send(avatar_display);


} catch (error) {
    console.log(error);
    return res.status(500).send({
        success: false,
        message: 'Error'
    })
}
}


const adminCreateController = async (req, res) => {

  try {

    const {name, Email, password, department, contactNumber} = req.fields;
    const {avatar} = req.files;

    if (!name || !Email || !password ||!department || !contactNumber || !avatar) {
        return res.status(401).send({message : "All fields are required"});
    }
    if (password.length < 8) {
        return res.status(401).send({message : "password must be of min 8 characters"});
    }
    if (contactNumber.length > 10 || contactNumber.length < 10) {
        return res.status(400).send({ message: "You have typed wrong phone number" });
    }
    if (!emailValidator.validate(Email)) {
        return res.status(400).send({ message: "Email is not correct" });
    }


    const oldadmin = await AdminModel.findOne({Email});

    if (oldadmin) {
        return res.status(401).send({message : "You are already Admin kindly login"});
    }

    const hashedpassword = await hashPassword(password);

    const admins = await new AdminModel({
      name,
      Email,
      password: hashedpassword,
      department,
      contactNumber,
      avatar,
  });


    if (avatar) {
          admins.avatar.data = fs.readFileSync(avatar.path),
          admins.avatar.contentType = avatar.type
         
    }


    await admins.save();

    return res.status(200).send({
        success: true,
        message : "Admin Register Successfully",
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};




module.exports = {  displaysuperavatar, adminCreateController };
