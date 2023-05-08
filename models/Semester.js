const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    Sem: {
        semNumber: String,
        Courses: [{
            course: String,
            Section: {
                A: [{
                    stu_id: mongoose.Schema.Types.ObjectId,
                    ref: "student"
                }], B: [{
                    stu_id: mongoose.Schema.Types.ObjectId,
                    ref: "student"
                }], C: [{
                    stu_id: mongoose.Schema.Types.ObjectId,
                    ref: "student"
                }], D: [{
                    stu_id: mongoose.Schema.Types.ObjectId,
                    ref: "student"
                }]
            }
        }]
    }
})

const Semesters = mongoose.model("Semester",SemesterSchema);

module.exports = Semesters