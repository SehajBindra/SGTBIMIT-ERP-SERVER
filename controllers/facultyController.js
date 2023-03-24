const facultyModel = require("../models/faculty");
const emailValidator = require('email-validator');
const {comparePassword, hashPassword} = require("../middleware/authpassword");
const Jwt = require("jsonwebtoken");

//register
const facultySignupCintroller = async(req,res) => {

    try {

        const {firstName,lastName,Email,password,phone,address,designation} = req.body;
        
        if (!firstName || !lastName || !Email || !password || !phone || !address || !designation) {
            return res.status(401).send({message : "All fields are required"});
        }
        if (firstName === lastName) {
            return res.status(401).send({message : "firstName and lastName should not be the same"});
        }
        if (phone.length > 10 || phone.length < 10) {
            return res.status(400).send({ message: "You have typed wrong phone number" });
        }
        if (password.length < 8) {
            return res.status(401).send({message : "password must be of min 8 characters"});
        }
        if (!emailValidator.validate(Email)) {
            return res.status(400).send({ message: "Email is not correct" });
        }


        const oldUser = await facultyModel.findOne({Email});

        if (oldUser) {
            return res.status(401).send({message : "You are already registered user kindly login"});
        }

        const hashedpassword = await hashPassword(password);

        const user = await new facultyModel({
            firstName,
            lastName,
            Email,
            designation,
            password: hashedpassword,
            phone,
            address,
        }).save();

        return res.status(200).send({
            success: true,
            message : "User Register Successfully",
            user, 
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



//login
const facultySigninCintroller = async(req,res) => {

    try {

        const {Email, password} = req.body;

        const faculty = await facultyModel.findOne({Email});
        if (!faculty) {
            return res.status(400).send({message : "You are not registered user pls register first"})
        }
        
        if(!Email || !password) {
            return res.status(400).send({message : "All fields are required"});
        }

        const match = await comparePassword(password, faculty.password);
        if (!match) {
            return res.status(400).send({message : "Invalid password"});
        }

        const token = await Jwt.sign({ _id: faculty._id }, process.env.JWT_SECRET, { expiresIn: "7d",});
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


module.exports = {facultySignupCintroller, facultySigninCintroller}