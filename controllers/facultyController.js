const facultyModel = require("../models/faculty");
const emailValidator = require('email-validator');
const {comparePassword, hashPassword} = require("../middleware/authpassword");
const Jwt = require("jsonwebtoken");
const studentModel = require("../models/faculty");


//login
const facultySigninCintroller = async(req,res) => {

    try {

        const {email, password} = req.body;

        const faculty = await facultyModel.findOne({email});
        console.log(faculty);
        if (!faculty) {
            return res.status(400).send({message : "You are not registered user pls register first"})
        }
        
        if(!email || !password) {
            return res.status(400).send({message : "All fields are required"});
        }

        const match = await comparePassword(password, faculty.password);
        if (!match) {
            return res.status(400).send({message : "Invalid password"});
        }

        const token = await Jwt.sign({ _id: faculty._id }, process.env.JWT_SECRET, { expiresIn: "7d",});
        console.log(token);
        return res.status(200).send({
            message : "User Login successfully",
            userID : faculty._id,
            token,
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : 'Error in Registration',
            error,
        });
    }
}
//facultyupdateController
 const facultyupdateController = async(req,res) => {
    try {
        const { firstName, Gender, lastName, dob, department, phone, address, avatar, email, designation } =
          req.body;
        const updatedFaculty = await Faculty.findOne({ facultyID });
        if (firstName) {
          updatedFaculty.firstName = firstName;
          await updatedFaculty.save();
        }
        if (email) {
            updatedFaculty.email = email;
            await updatedFaculty.save();
          }
        if (Gender) {
            updatedFaculty.Gender = Gender;
            await updatedFaculty.save();
        }
        if (lastName) {
            updatedFaculty.lastName = lastName;
            await updatedFaculty.save();
        }
        if (dob) {
          updatedFaculty.dob = dob;
          await updatedFaculty.save();
        }
        if (department) {
          updatedFaculty.department = department;
          await updatedFaculty.save();
        }
        if (address) {
            updatedFaculty.address = address;
            await updatedFaculty.save();
          }
        if (phone) {
          updatedFaculty.phone = phone;
          await updatedFaculty.save();
        }
        if (designation) {
          updatedFaculty.designation = designation;
          await updatedFaculty.save();
        }
        if (avatar) {
          updatedFaculty.avatar = avatar;
          await updatedFaculty.save();
        }
        res.status(200).json(updatedFaculty);
      } catch (error) {
        const errors = { backendError: String };
        errors.backendError = error;
        res.status(500).json(errors);
      }
 }

 const facultyRemoveController = async(req,res) => {
    try {
        const deletefaculty = await facultyModel.findByIdAndDelete(req.facultyID);
        if (!deletefaculty) {
          return res.status(404).json({ message: 'Faculty not found' });
        }
        res.json({ message: 'Record deleted successfully', data: deletedfaculty });
      } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
      }
 }
module.exports = { facultySigninCintroller, facultyupdateController, facultyRemoveController}