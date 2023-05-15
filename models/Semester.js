const mongoose = require('mongoose');

const SemesterSchema = new mongoose.Schema({
    Sem: {
        semNumber: String,
        Courses: [
            {
                course: String,
                Sections: [
                    {
                        section: String,
                        StudentsIDs: [
                            {
                                stu_id: {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "student",
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

const Semesters = mongoose.model("Semester", SemesterSchema);

module.exports = Semesters