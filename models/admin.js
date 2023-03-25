const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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

const admin = mongoose.model("adminSchema", adminSchema);
module.exports = admin;