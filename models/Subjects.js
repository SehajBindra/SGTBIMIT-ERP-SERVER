const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    Course: String,
    Sem: [
        {
            semNumber: Number,
            Subjects: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "allsubject"
                }
            ]
        }
    ]


});

const Subjects = mongoose.model("Subject", SubjectSchema);

module.exports = Subjects