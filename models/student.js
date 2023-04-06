const mongoose = require('mongoose');
const student = new mongoose.Schema({

    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String,
        require : true,
    },
    Email : {
        type : String,
        require : true,
        unique : true,
    },
    password : {
        type : String,
        require : true,
    },
    phone : {
        type : Number,
        require : true,
    },
    address : {
        type : {},
        require :true,
    },
    role : {
        type : Number,
        default : 0,
    },
    tokens: [
        {
            token:{
                type: {},
                required:true
            }
        }
    ],
    otp: {
        type : String,
    }
},
    {timestamps : true,}
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