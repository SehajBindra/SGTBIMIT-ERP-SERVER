const Jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../middleware/authpassword");
const emailValidator = require("email-validator");
const adminModel = require("../models/admin");
const studentModel = require("../models/student");
const fs = require("fs");
const xlsx = require("xlsx");

const adminSignupController = async (req, res) => {
  try {
    const { name, Email, password, department, contactNumber } = req.fields;
    const avatar = req.files;

    if (
      !name ||
      !Email ||
      !password ||
      !department ||
      !contactNumber ||
      !avatar
    ) {
      return res.status(401).send({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(401)
        .send({ message: "password must be of min 8 characters" });
    }
    if (contactNumber.length > 10 || contactNumber.length < 10) {
      return res
        .status(400)
        .send({ message: "You have typed wrong phone number" });
    }
    if (!emailValidator.validate(Email)) {
      return res.status(400).send({ message: "Email is not correct" });
    }

    const oldAdmin = await adminModel.findOne({ Email });

    if (oldAdmin) {
      return res
        .status(401)
        .send({ message: "You are already admin kindly login" });
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
      message: "Error in Registration",
      error,
    });
  }
};

const adminSigninController = async (req, res) => {
  try {
    const { Email, password } = req.body;

    if (!Email || !password) {
      return res.status(400).send({ message: "all fields are reuiqred" });
    }
    const Admin = await adminModel.findOne({ Email });
    if (!Admin) {
      return res
        .status(400)
        .send({ message: "You are not registered Admin pls register first" });
    }
    const match = await comparePassword(password, Admin.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = await Jwt.sign({ _id: Admin._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

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
      message: "error in registration",
    });
  }
};

const SemesterAdd = async (sem,course,section,_id) =>{
    try {
        
    } catch (error) {
        console.log(error);
    }
}

const MultipleStudentsAdd = async (req, res) => {
  try {
    const { fileData } = req.files;

    const xlsxFile = xlsx.readFile(fileData.path);
    const sheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]];
    const P_Json = xlsx.utils.sheet_to_json(sheet);

    console.log(P_Json[0]);

    const RejectData = [];

    if (P_Json.length) {
      for (let i = 0; i < P_Json.length; i++) {
        const SearchData = studentModel.findOne({
          rollnumber: P_Json[i].rollnumber,
          email: P_Json[i].email,
          phone: P_Json[i].phone,
        });

        // console.log(SearchData);

        if (SearchData) {
          await RejectData.push(P_Json[i]);
        } else {
          const StudentData = await studentModel({
            fathernumber: P_Json[i].fathername,
            section: P_Json[i].section,
            firstname: P_Json[i].firstname,
            lastname: P_Json[i].lastname,
            year: P_Json[i].year,
            department: P_Json[i].department,
            gender: P_Json[i].gender,
            mothername: P_Json[i].mothername,
            fathername: P_Json[i].fathername,
            dob: P_Json[i].dob,
            email: P_Json[i].email,
            phone: P_Json[i].phone,
            address: P_Json[i].address,
            rollnumber: P_Json[i].rollnumber,
            course: P_Json[i].course,
            semester: P_Json[i].semester,
          });

          const passwordCreate =
            P_Json[i].rollnumber + P_Json[i].firstname.toUpperCase();
          const hashedPassword = await hashPassword(passwordCreate);
          StudentData.password = hashedPassword;
          StudentData.batch = P_Json[i].year;
          StudentData.role = 3;

          await StudentData.save;
        }
      }
    }

    if (RejectData.length) {
      return res
        .status(200)
        .send({ message: "Some Data not Add", Data: RejectData });
    } else {
      return res.status(200).send("Data successfully Add");
    }

  } catch (error) {
    console.log(error);
  }
};

const AdminStudentAdd = async (req, res) => {
  try {
    const {
      fathernumber,
      section,
      firstname,
      lastname,
      year,
      department,
      gender,
      mothername,
      fathername,
      dob,
      email,
      phone,
      address,
      rollnumber,
      course,
      semester,
    } = req.fields;

    const { avatar } = req.files;

    if (
      !firstname ||
      !lastname ||
      !email ||
      !phone ||
      !address ||
      !fathernumber ||
      !section ||
      !year ||
      !department ||
      !gender ||
      !mothername ||
      !fathername ||
      !dob ||
      !rollnumber ||
      !course ||
      !semester
    ) {
      return res.status(401).send({ message: "All fields are required" });
    }

    if (avatar && avatar > 1000000) {
      return res
        .status(401)
        .send({ message: "Avatar size is 1Mb Required", success: false });
    }

    if (firstname === lastname) {
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

    const StudentCheck = await studentModel.findOne({
      rollnumber,
      email,
      phone,
    });

    console.log(StudentCheck);
    if (StudentCheck) {
      return res
        .status(401)
        .send({ message: "Student Already registered", success: false });
    } else {
      const StudentDetails = await studentModel(req.fields);

      if (avatar) {
        StudentDetails.avatar.data = fs.readFileSync(avatar.path);
        StudentDetails.avatar.contentType = avatar.type;
        StudentDetails.avatar.Name = avatar.name;
      }

      const passwordCreate = rollnumber + firstname.toUpperCase();
      const hashedPassword = await hashPassword(passwordCreate);
      StudentDetails.password = hashedPassword;
      StudentDetails.batch = year;
      StudentDetails.role = 3;

      await StudentDetails.save();
      return res
        .status(200)
        .send({ message: "Student has been Created ", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminSigninController,
  adminSignupController,
  AdminStudentAdd,
  MultipleStudentsAdd
};
