const Jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../middleware/authpassword");
const emailValidator = require("email-validator");
const adminModel = require("../models/admin");
const studentModel = require("../models/student");
const fs = require("fs");
const xlsx = require("xlsx");
const Semeters = require('../models/Semester');
const facultyModel = require("../models/faculty");


const adminSigninController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "all fields are reuiqred" });
    }
    const Admin = await adminModel.findOne({ email });
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
      role : Admin.role,
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

const SemesterAdd = async (sem, course, section, id) => {
  try {

    const SearchData = await Semeters.find();

    console.log(typeof sem);

    const SemesterResult = {
      data: "",
      result: false
    }

    const CourseResult = {
      data: "",
      result: false
    }

    const SectionResult = {
      data: "",
      result: false
    }

    if (SearchData.length) {
      // for(let i=0;i<SearchData.length;i++){
      // if (SearchData[i].Sem.semNumber == sem.toString()) {
      //   SemesterResult.data = SearchData[i];
      //   SemesterResult.result = true;
      // }
      // }
      SearchData.map((value) => {
        // console.log(value);
        if (value.Sem.semNumber == sem.toString()) {
          SemesterResult.data = value;
          SemesterResult.result = true;
        }
      })
    } else {
      await Semeters({
        Sem: {
          semNumber: sem,
          Courses: [{
            course: course,
            Sections: [{
              section: section,
              StudentsIDs: [{
                stu_id: id
              }]
            }]
          }]
        }
      }).save()
      return
    }

    if (SemesterResult.result) {
      SemesterResult.data.Sem.Courses.map((value) => {
        // console.log(value);
        if (value.course === course) {
          CourseResult.data = value;
          CourseResult.result = true
        }
      })
    } else {
      await Semeters({
        Sem: {
          semNumber: sem,
          Courses: [{
            course: course,
            Sections: [{
              section: section,
              StudentsIDs: [{
                stu_id: id
              }]
            }]
          }]
        }
      }).save()
      return
    }

    if (CourseResult.result) {
      // console.log(CourseResult.data.Sections);
      CourseResult.data.Sections.map((value) => {
        if (value.section === section) {
          SectionResult.data = value;
          SectionResult.result = true
        }
      })
    } else {

      await Semeters.updateOne({ "Sem.semNumber": sem }, {
        $push: {
          "Sem.Courses": {
            course: course,
            Sections: [{
              section: section,
              StudentsIDs: [{
                stu_id: id
              }]
            }]
          }
        }
      });

      return
      // console.log(data);
    }


    if (SectionResult.result) {
      // console.log("2");
      await Semeters.updateOne({ "Sem.semNumber": sem, "Sem.Courses.course": course, "Sem.Courses.Sections.section": section }, {
        $push: {
          "Sem.Courses.$[course].Sections.$[section].StudentsIDs": [{
            stu_id: id
          }]
        }
      }, { arrayFilters: [{ "course.course": course }, { "section.section": section }] });
      return
      // console.log(data);
    } else {
      // console.log("1");
      await Semeters.updateOne({ "Sem.semNumber": sem, "Sem.Courses.course": course }, {
        $push: {
          "Sem.Courses.$[course].Sections": [{
            section: section,
            StudentsIDs: [{
              stu_id: id
            }]
          }]
        }
      }, { arrayFilters: [{ "course.course": course }] })

      return
    }

  } catch (error) {
    console.log(error); s
  }
}

const MultipleStudentsAdd = async (req, res) => {
  try {
    const { fileData } = req.files;

    const xlsxFile = xlsx.readFile(fileData.path);
    const sheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]];
    const P_Json = xlsx.utils.sheet_to_json(sheet);

    // console.log(P_Json[0].rollnumber);


    const RejectData = [];

    if (P_Json.length) {
      for (let i = 0; i < P_Json.length; i++) {
        const SearchData = await studentModel.findOne({
          rollnumber: P_Json[i].rollnumber,
          email: P_Json[i].email,
          phone: P_Json[i].phone,
        });

        // console.log(SearchData);

        if (SearchData) {
          await RejectData.push(P_Json[i]);
        } else {
          const StudentData = await studentModel({
            fathernumber: P_Json[i].fathernumber,
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

          await SemesterAdd(P_Json[i].semester, P_Json[i].course, P_Json[i].section, StudentData._id)
          await StudentData.save();
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

    if (StudentCheck) {
      return res.status(401).send({ message: "Student Already registered", success: false })
    } else {
      const StudentDetails = await studentModel(req.fields);

      if (avatar) {
        StudentDetails.avatar.data = fs.readFileSync(avatar.path);
        StudentDetails.avatar.contentType = avatar.type;
        StudentDetails.avatar.Name = avatar.name;
      }

      const passwordCreate = rollnumber + firstname.toUpperCase();
      console.log(passwordCreate);
      const hashedPassword = await hashPassword(passwordCreate.toString());
      StudentDetails.password = hashedPassword;
      StudentDetails.batch = year;

      await StudentDetails.save();
      return res.status(200).send({ message: "Student has been Created ", success: true })
    }

  } catch (error) {
    console.log(error);
  }
}

const FacultyAdd = async (req, res) => {
  try {
    const { firstName,lastname,Gender,Joinyear,dob,designation,email,phone,address,Category} = req.fields;
    const { avatar } = req.files;

    if (!firstName || !lastname || !Gender || !Joinyear ||!dob || !designation || !email || !phone || !address ||!Category) {
      return res.status(401).send({ message: "All fields are required" });
    }
  
    if (phone.length > 10 || phone.length < 10) {
      return res.status(400).send({ message: "You have typed wrong phone number" });
    }
    if (!emailValidator.validate(email)) {
      return res.status(400).send({ message: "Email is not correct" });
    }
    if(avatar && avatar.size < 1000000){
      return res.status(400).send({message : "Avatar Size required 1Mb only"})
    }

    const DataCheck = await facultyModel.findOne({email,phone});

    if(!DataCheck){
      const FacultyData = await facultyModel(req.fields);

      if(avatar){
        FacultyData.avatar.data = fs.readFileSync(avatar.path);
        FacultyData.avatar.contentType = avatar.type;
        FacultyData.avatar.Name = avatar.name;
      };

      switch(Category){
        case "Teacher" : FacultyData.role = 3
      }

      const passwordCreate = phone + firstName;
      console.log(passwordCreate);
      const hashedPassword = await hashPassword(passwordCreate);
      FacultyData.password = hashedPassword;


      await FacultyData.save()
      return res.status(200).send({message : "Account has been Created"})
    }
  } catch (error) {
    console.log(error);
  }
}

const StuDeleteInSem = async (Sem, cour, sect, id) => {
  try {
    const Datafind = await Semester.findOne({ "Sem.Courses.Sections.StudentsIDs.stu_id": id });
    if (Datafind) {
     const data =  await Semester.updateOne({"Sem.semNumber" : Sem, "Sem.Courses.Sections.StudentsIDs.stu_id": id },{$pull : {
        "Sem.Courses.$[course].Sections.$[section].StudentsIDs" : {
          stu_id : id
        }
      }},{arrayFilters : [{"course.course":cour},{"section.section" : sect}]});

      console.log(data);
      return
    }
  } catch (error) {
    console.log(error);
  }
}


//---------------Student Delete Route-------------------- //

const StudentDelete = async (req, res) => {
  try {
    const { _id } = req.params;
    const studentData = await studentModel.findById(_id).select("-avatar");

    if (studentData) {
      await StuDeleteInSem(studentData.semester, studentData.course, studentData.section, studentData._id)
      await studentModel.findByIdAndDelete(_id);
      return res.send({message : "Data is delete", data : studentData})
    }
  } catch (error) {
    console.log(error);
  }
}


module.exports = { adminSigninController, AdminStudentAdd, MultipleStudentsAdd,FacultyAdd,StudentDelete };