const mongoose = require('mongoose');

const Admin = new mongoose.Schema({
    
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
        default : 0,
    },

},  {timestamps : true,}
);

const superAdmin = mongoose.model("SuperAdmin", Admin);
module.exports = superAdmin;