const studentModel = require("../models/student");
const { comparePassword, hashPassword } = require("../middleware/authpassword");
const Jwt = require("jsonwebtoken");
const emailValidator = require("email-validator");
const validateOTP = require("../middleware/otpvalidation");
const Semester = require("../models/Semester");
const StuTimeTable = require("../models/StudentTimeTable");


//login
const studentSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const User = await studentModel.findOne({ email });
    if (!User) {
      return res
        .status(400)
        .send({
          message: "You are not a registered user. Please register first",
        });
    }

    if (!email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const match = await comparePassword(password, User.password);
    if (!match) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const token = Jwt.sign({ _id: User._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).send({
      message: "User Login successfully",
      userID: User._id,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "error in login",
      error,
    });
  }
};





// Update student
const studentUpdateController = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await studentModel.findById(studentId);

    if (!studentData) {
      return res.status(404).json({ message: 'Data not found! Kindly register' });
    }

    const isMatch = await comparePassword(req.body.password, studentData.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const updatedStudentData = await studentModel.findByIdAndUpdate(studentId, req.body, { new: true })

    res.json(updatedStudentData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }

};



//OTP  Validation
exports.forgotPassword = async (req, res, next) => {
  try {
    const { errors, isValid } = validateForgotPassword(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const { email } = req.body;
    const student = await Student.findOne({ email }); //! Instead of Student, studentModel hona chahiye...

    if (!student) {
      errors.email = "Email not found";
      return res.status(400).json(errors);
    }
    function generateOTP() {
      var digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }

      return OTP;
    }

    const otp = generateOTP();
    student.otp = otp;
    await student.save();
    await sendEmail(student.email, otp, "OTP");
    res.status(200).json({ message: "Check your registered email for OTP" });

    const helper = async () => {
      student.otp = "";
      await Student.save(); //! Check for spelling error, might not be referencing to the student object
    };

    setTimeout(function () {
      helper();
    }, 3000);
  } catch (err) {
    console.log("Error in sending email", err.message);
  }
};

exports.postOTP = async (req, res, next) => {
  try {
    const { errors, isValid } = validateOTP(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const { email, otp, newPassword, confirmNewPassword } = req.body;
    if (newPassword !== confirmNewPassword) {
      errors.confirmNewPassword = "Password Mismatch";
      return res.status(400).json(errors);
    }
    const student = await Student.findOne({ email });
    if (student.otp !== otp) {
      errors.otp = "Invalid OTP, check your email again";
      return res.status(400).json(errors);
    }

    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    await student.save();
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.log("Error in submitting OTP", err.message);
    return res.status(400).json({ message: "Error in submitting OTP" });
  }
};


//Student Data Display 
const StudentDataDetail = async (req, res) => {
  try {
    const DataCheck = await studentModel.findById(req._id).select("firstname lastname batch course rollnumber address phone email section semester");
    if (DataCheck) {
      return res.status(200).send(DataCheck)
    } else {
      return res.status(500).send("Data not exist")
    }

  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}

//Student Image Get 
const StudentImageGet = async (req, res) => {
  try {
    const { _id } = req.params;
    const Data = await studentModel.findById(_id, { avatar: 1 });
    if (Data) {
      res.set("Content-type", Data.avatar.contentType);
      return res.status(200).send(Data.avatar.data);
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}


const StudentTimeTableGet = async (req, res) => {
  try {
    const { Date, Course, Semester, section } = req.body.Detail;
    console.log(req.body);

    const SearchData = await StuTimeTable.findOne({ Date, Course }, { "Sems.Sections.Subjects.Student_ids": 0 }).populate("Sems.Sections.Subjects.subject_id", "_id Subject_Code Subject_Name").populate("Sems.Sections.Subjects.Teacher_id", "_id firstName lastName");

    const SemesterCheck = {
      data: "",
      status: false
    }

    const SectionCheck = {
      data: "",
      status: false
    }

    if (SearchData) {
      SearchData.Sems.map((value) => {
        if (value.sem == Semester) {
          SemesterCheck.data = value;
          SemesterCheck.status = true
        }
      })
    } else {
      return res.send({ message: "Today Time Table Not Found", status: false });
    }

    if (SemesterCheck.status) {
      SemesterCheck.data.Sections.map((value) => {
        if (value.section == section) {
          SectionCheck.data = value
          SectionCheck.status = true
          return res.status(200).send(value.Subjects);
        }
      })
    } else {
      return res.send({ message: `Today ${Semester} Semester Time Table Not Found`, status: false });
    }

    if (!SectionCheck.status) {
      return res.send({ message: `Today ${Semester} Semester Section ${section} Time Table Not Found`, status: false })
    }
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
}


module.exports = {
  studentSigninController,
  studentUpdateController,
  StudentDataDetail,
  StudentImageGet,
  StudentTimeTableGet
};
