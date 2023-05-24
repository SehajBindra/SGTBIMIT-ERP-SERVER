const mongoose = require("mongoose");

const allSubjectSchema = new mongoose.Schema({
    Course: {
        type: String,
        require: true,
    },
    Sem: {
        type: Number,
        require: true,
    },
    Subject_Code: {
        type: Number,
        require: true,
    },
    Subject_Name: {
        type: String,
        require: true,
    },
    Categories: {
        type: String,
        require: true,
        enum: ["Default", "Optional"]
    },
    Teachers: [
        {
            Section: {
                type: String,
                enum: ["A", "B", "C", "D"]
            },
            Teachers_id: { type: mongoose.Schema.Types.ObjectId, ref : "faculty" }
        }
    ]

}, { timestamps: true, }
);

const Allsubject = mongoose.model("allsubject", allSubjectSchema);

module.exports = Allsubject;