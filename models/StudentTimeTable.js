const mongoose = require("mongoose");

const StuTimeTableSchema = mongoose.Schema(
  {
    Date: String,
    Course: { type: String },
    Sems: [
      {
        sem: Number,
        Sections: [
          {
            section: { type: String, enum: ["A", "B", "C", "D"] },
            Subjects: [
              {
                subject_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "allsubject",
                },
                Teacher_id: {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "faculty",
                },
                Student_ids: [
                  {
                      type: mongoose.Schema.Types.ObjectId,
                      ref: "student",
                  },
                ],
                time: String,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    timestamp: true,
  }
);

const StuTimeTable = mongoose.model("StuTimeTable", StuTimeTableSchema);

module.exports = StuTimeTable;
