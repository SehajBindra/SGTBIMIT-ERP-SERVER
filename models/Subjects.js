const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
    Course: String,
    Sem: [
        {
            semNumber: String,
            Subjects: {
                Default: [
                    {
                        Subject_Name: String,
                        Subject_Code: Number
                    }
                ],
                Optional: [
                    {
                        Subject_Name: String,
                        Subject_Code: Number
                    }
                ]
            }
        }
    ]


});

const Subjects = mongoose.model("Subject", SubjectSchema);

module.exports = Subjects