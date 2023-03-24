const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({

    firstName : {
        type : String,
        require : true,
    },
    lastName : {
        type : String,
        require : true,
    },
    designation : {
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
    {timestamps: true,}
)

const faculties = mongoose.model("facultySchema", facultySchema);
module.exports = faculties;