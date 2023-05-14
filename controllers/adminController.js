const Jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../middleware/authpassword");
const emailValidator = require("email-validator");
const adminModel = require("../models/admin");
const studentModel = require("../models/student");
const fs = require('fs')
const facultyModel = require("../models/faculty");

const adminSignupController = async (req, res) => {
    try {

        const { name, Email, password, department, contactNumber } = req.fields;
        const avatar = req.files;


        if (!name || !Email || !password || !department || !contactNumber || !avatar) {
            return res.status(401).send({ message: "All fields are required" });
        }
        if (password.length < 8) {
            return res.status(401).send({ message: "password must be of min 8 characters" });
        }
        if (contactNumber.length > 10 || contactNumber.length < 10) {
            return res.status(400).send({ message: "You have typed wrong phone number" });
        }
        if (!emailValidator.validate(Email)) {
            return res.status(400).send({ message: "Email is not correct" });
        }


        const oldAdmin = await adminModel.findOne({ Email });

        if (oldAdmin) {
            return res.status(401).send({ message: "You are already admin kindly login" });
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
            message: "Admin Register Successfully",
            user,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error,
        });
    }
}




const adminSigninController = async (req, res) => {

    try {

        const { Email, password } = req.body;

        if (!Email || !password) {
            return res.status(400).send({ message: "all fields are reuiqred" });
        }
        const Admin = await adminModel.findOne({ Email });
        if (!Admin) {
            return res.status(400).send({ message: "You are not registered Admin pls register first" })
        }
        const match = await comparePassword(password, Admin.password);
        if (!match) {
            return res.status(400).send({ message: "Invalid password" });
        }
        const token = await Jwt.sign({ _id: Admin._id }, process.env.JWT_SECRET, { expiresIn: "7d", })


        return res.status(200).send({
            message: "Admin Login successfully",
            userID: Admin._id,
            Name: Admin.name,
            token,
        });


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "error in registration"
        })
    }
}


const AdminStudentAdd = async (req, res) => {
    try {
        const {
            fatherNumber,
            section,
            firstName,
            lastName,
            year,
            department,
            gender,
            motherName,
            fatherName,
            dob,
            email,
            phone,
            address,
            roll_Number,
            course,
            semester
        } = req.fields

        const {avatar} = req.files;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !phone ||
            !address ||
            !fatherNumber ||
            !section ||
            !year ||
            !department ||
            !gender ||
            !motherName ||
            !fatherName ||
            !dob ||
            !roll_Number ||
            !course ||
            !semester
        ) {
            return res.status(401).send({ message: "All fields are required" });
        }

        if (avatar && avatar > 1000000) {
            return res.status(401).send({ message: "Avatar size is 1Mb Required", success: false });
        }

        if (firstName === lastName) {
            return res
                .status(401)
                .send({ message: "firstName and lastName should not be the same" });
        }

        if (phone.length > 10 || phone.length < 10) {
            return res
                .status(400)
                .send({ message: "You have typed wrong phone number" });
        }

        if (!emailValidator.validate(email)) {
            return res.status(400).send({ message: "Email is not correct" });
        }

        const StudentCheck = await studentModel.findOne({ roll_Number, email, phone });

        if (StudentCheck) {
            return res.status(401).send({ message: "Student Already registered", success: false })
        } else {
            const StudentDetails = await studentModel(req.fields);
            if (avatar) {
                StudentDetails.avatar.data = fs.readFileSync(avatar.path);
                StudentDetails.avatar.contentType = avatar.type;
                StudentDetails.avatar.Name = avatar.name;
            }
            const passwordCreate = roll_Number + firstName.toUpperCase();
            // const hashedPassword = await hashPassword(passwordCreate);
            StudentDetails.password = passwordCreate;
            StudentDetails.batch = year;
            StudentDetails.role = 3;
            await StudentDetails.save();
            return res.status(200).send({ message: "Student has been Created ", success: true })
        }
    } catch (error) {
        console.log(error);
    }
}
const adminaddfaculty = async(req,res) => {
    try{
        const{
            firstName,
            lastName,
            Gender,
            Joinyear,
            dob,
            designation, 
            Email,
            phone,
            address,
            role
        } = req.fields
        const{avatar} = req.fields;
        if(
            !firstName||
            !lastName||
            !Gender||
            !Joinyear||
            !dob||
            !designation|| 
            !Email||
            !phone||
            !address||
            !role
        ){
        return res
        .status(401)
        .send("All fields are required");
    }
        if(firstName == lastName){
            return res
            .status(400)
            .send({ message: "firstName and lastName should not be the same" })
        }
        if (!emailValidator.validate(Email)) {
            return res
            .status(401)
            .send({ message: "Email is not correct" });
        }
        // const facultycheck = await facultyModel({ Email })
        // if(facultycheck){
        //     return res
        //     .status(400)    
        //     .send({message:"Faculty already exist",success:false});
        // }
        else{
        const facultydetails = await facultyModel(req.fields);
        if (avatar) {
            facultydetails.avatar.data = fs.readFileSync(avatar.path);
            facultydetails.avatar.contentType = avatar.type;
            facultydetails.avatar.Name = avatar.name;
        }
        const passwordCreate =  firstName.toUpperCase();
        facultydetails.password = passwordCreate;
        await facultydetails.save();
        return res
        .status(200)
        .send({ message: "faculty has been Created ", success: true })
        }
    }
    catch(Errors){
        console.log(Errors);
        return res
        .status(500)
        .send({
            success: false,
            message: "error in registration"
        })
    }
}

module.exports = { adminSigninController, adminSignupController, AdminStudentAdd, adminaddfaculty};