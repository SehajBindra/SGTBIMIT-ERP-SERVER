const Jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const {hashPassword, comparePassword} = require("../middleware/authpassword");
const adminModel = require("../models/admin");

const adminSignupController = async(req,res) => {
    try {
        
        const {name,Email,password,department,contactNumber} = req.body;
        const avatar = req.file;

        
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


        const oldAdmin = await adminModel.findOne({Email});

        if (oldAdmin) {
            return res.status(401).send({message : "You are already admin kindly login"});
        }

        const hashedpassword = await hashPassword(password);

        const user = await new adminModel({
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
            message : "Admin Register Successfully",
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




const adminSigninController = async(req,res) => {

    try {

        const {Email,password} = req.body;

        if (!Email || !password) {
            return res.status(400).send({message : "all fields are reuiqred"});
        }
        const Admin = await adminModel.findOne({Email});
        if (!Admin) {
            return res.status(400).send({message : "You are not registered Admin pls register first"})
        }
        const match = await comparePassword(password, Admin.password);
        if (!match) {
          return res.status(400).send({ message: "Invalid password" });
        }
        const token = await Jwt.sign({_id : Admin._id}, process.env.JWT_SECRET,  {expiresIn: "7d",})

        
        return res.status(200).send({
            message : "Admin Login successfully",
            userID : Admin._id,
            Name : Admin.name,
            token,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message : "error in registration"
        })
    }
}


module.exports = {adminSigninController, adminSignupController};