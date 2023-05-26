const mongoose = require('mongoose');

const StudentAttendanceSchema = mongoose.Schema({
    Date : Date,
    Courses :[{
        Course : String,
        Sems : [{
            Sem : Number,
            Sections : [{
                Section : String,
                Subjects : [{
                    Subject_id : {type : mongoose.Schema.Types.ObjectId, ref : "allsubject"},
                    Teacher_id : {type : mongoose.Schema.Types.ObjectId, ref : "faculty"},
                    Student_ids : [{
                        Student_id : {type : mongoose.Schema.Types.ObjectId, ref : "student"}
                    }]
                }]
            }]
        }]
    }]
},{timestamp : true});

const StuAttendance = mongoose.model("StuAttendance",StudentAttendanceSchema);

module.exports = StuAttendance;