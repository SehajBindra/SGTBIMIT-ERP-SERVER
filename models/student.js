const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema(
  {
    batch: {
      type: String,
      required: true,
    },
    fathernumber: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
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
      data : Buffer,
      contentType : String,
      Name : String,
    },
    mothername: {
      type: String,
      required: true,
    },
    fathername: {
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
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 2,
    },
    rollnumber : {
      type : Number,
      required : true
    },
    course :{
      type : String,
      required : true
    },
    semester : {
      type : String,
      required : true
    },
    otp: {
      type: String,
    },
    Subjects :{
      default : [
        {type : mongoose.Schema.Types.ObjectId,
          ref : "Subject"}
      ]
    }
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

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
