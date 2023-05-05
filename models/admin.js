const mongoose = require('mongoose');

const admin = new mongoose.Schema({
    name : {
        type : String,
        require: true,
    },
    Email : {
        type : String,
        require: true,
    },
    password : {
        type : String,
        require : true,
    },
    department : {
        type : String,
        require : true,
    },
    contactNumber : {
        type : Number,
        require : true,
        unique : true,
    },
    avatar : {
        data : Buffer,
        contentType : String, 
    },
    role : {
        type : Number,
        default : 1,
    },

},  {timestamps : true,}
);

const Admin = mongoose.model("admin", admin);
module.exports = Admin;