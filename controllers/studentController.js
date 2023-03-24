const studentModel = require('../models/student');
const {comparePassword, hashPassword} = require("../middleware/authpassword");
const emailValidator = require('email-validator');


const studentSignupController = async(req,res) => {
    try {
        
        const {firstName,lastName,Email,password,phone,address} = req.body;
        
        if (!firstName || !lastName || !Email || !password || !phone || !address) {
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


        const oldUser = await studentModel.findOne({Email});

        if (oldUser) {
            return res.status(401).send({message : "You are already registered user kindly login"});
        }

        const hashedpassword = await hashPassword(password);

        const user = await new studentModel({
            firstName,
            lastName,
            Email,
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


module.exports = {studentSignupController}