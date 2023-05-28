const mongoose = require("mongoose");

const TeahTimeTableSchema = mongoose.Schema(
  {
    Teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: "faculty" },
    Subjects: [
      {
        Subject_id: { type: mongoose.Schema.Types.ObjectId, ref: "allsubject" },
        Course: String,
        Sem: Number,
        Section: { type: String, enum: ["A", "B", "C", "D"] },
        time: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const TeacherTimeTable = mongoose.model("TeacTimeTable", TeahTimeTableSchema);

module.exports = TeacherTimeTable;