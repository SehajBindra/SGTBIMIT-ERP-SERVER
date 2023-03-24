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
},
    {timestamps : true,}
);

const Student = mongoose.model("student", student);
module.exports = Student;