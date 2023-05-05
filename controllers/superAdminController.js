const facultyModel = require("../models/faculty")
const studentModel = require("../models/student");
const superAdminModel = require("../models/superAdmin");
const AdminModel = require("../models/admin");
const fs = require("fs");
const emailValidator = require("email-validator");
const { hashPassword } = require("../middleware/authpassword");



const superAdminCreateController = async (req, res) => {

  try {

    const {name, Email, password, department, contactNumber, role} = req.body;
    const avatar = req.files;

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


    const oldsuperAdmin = await superAdminModel.findOne({Email});

    if (oldsuperAdmin) {
        return res.status(401).send({message : "You are already superAdmin kindly login"});
    }

    const hashedpassword = await hashPassword(password);

    const superadmin = await new superAdminModel({
        name,
        Email,
        password: hashedpassword,
        department,
        contactNumber,
        avatar,
        role,
    }).save();

    return res.status(200).send({
        success: true,
        message : "superAdmin Register Successfully",
        superadmin, 
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



const adminCreateController = async (req, res) => {

  try {

    if (req.superAdminModel.role !== 0) {
        return res.status(401).send({message: "UnAuthorized Access"});
    }


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};


const facultyCreateController = async (req, res) => {

  try {

    if (req.superAdminModel.role !== 0) {
        return res.status(401).send({message: "UnAuthorized Access"});
    }


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const StudentCreateController = async (req, res) => {

  try {

    if (req.superAdminModel.role !== 0) {
        return res.status(401).send({message: "UnAuthorized Access"});
    }


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

module.exports = { superAdminCreateController, adminCreateController, facultyCreateController, StudentCreateController };
