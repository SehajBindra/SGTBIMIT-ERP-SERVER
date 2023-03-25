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
    role : {
        type : Number,
        default : 2,
    },

},  {timestamps : true,}
);

const Admin = mongoose.model("admin", admin);
module.exports = Admin;