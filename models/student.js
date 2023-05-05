const mongoose = require("mongoose");
const student = new mongoose.Schema(
  {
    batch: {
      type: Number,
      required: true,
    },
    fatherNumber: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    subjectsAndCode: {
      type: [],
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
    },
    motherName: {
      type: String,
      required: true,
    },
    fatherName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },
    role: {
      type: Number,
      default: 3,
    },
    tokens: [
      {
        token: {
          type: {},
          required: true,
        },
      },
    ],
    otp: {
      type: String,
    },
  },
  { timestamps: true }
);
/////Generating tokens
// student.method.verifyToken = asyncfuction () {
//     // try {
//         let token = jwt.sign(payload, secretkey, [options,callback])
// await this.save();
// return token;
//     }
//     // catch (err) {
//         console.log(err);
//     }
// }

const Student = mongoose.model("student", student);
module.exports = Student;
