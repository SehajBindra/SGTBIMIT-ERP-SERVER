const mongoose = require('mongoose');

const faculty = new mongoose.Schema({

    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String,
        require : true,
    },
    Gender : {
        type : String,
        require : true,
    },
    Joinyear : {
        type : Number,
        require : true,
    },
    avatar: {
        data : Buffer,
        contentType : String,
        Name : String,
    },
    dob: {
        type: String,
        required: true
    },
    designation : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
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
    },
},
    {timestamps: true,}
)

const faculties = mongoose.model("faculty", faculty);
module.exports = faculties;