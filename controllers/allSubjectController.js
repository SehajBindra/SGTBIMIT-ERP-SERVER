const Subjects = require("../models/all_subject");
const SubjectHandler = require('../models/Subjects');

const SubjectHandlerAdd = async (Course, Sem, Categories, id) => {
    try {

        // console.log(Course, Sem, Categories, id);
        const SearchData = await SubjectHandler.findOne({ Course });
        // console.log(SearchData);
        const SemCheck = {
            data: "",
            status: false
        }

        if (SearchData) {
            // console.log("Hi");
            SearchData.Sem.map((value) => {
                if (value.semNumber == Sem) {
                    SemCheck.data = value;
                    SemCheck.status = true;
                }
            })
        } else {
            console.log("h1");
            if (Categories == "Default") {
                // console.log("check");
                await SubjectHandler({
                    Course: Course,
                    Sem: [{
                        semNumber: Sem,
                        Subjects: {
                            Default: [id]
                        }
                    }]
                }).save();
                return
            } else if (Categories == "Optional") {
                // console.log("check 2");
                await SubjectHandler({
                    Course: Course,
                    Sem: [{
                        semNumber: Sem,
                        Subjects: {
                            Optional: [id]
                        }
                    }]
                }).save();
                return
            }
        }


        if (SemCheck.status) {
            // console.log("Check 3");
            if (Categories == "Default") {
                await SubjectHandler.updateOne({ Course: Course, "Sem.semNumber": Sem }, {
                    $push: {
                        "Sem.$[semNumber].Subjects.Default": id
                    }
                }, { arrayFilters: [{ "semNumber.semNumber": Sem }] })
                return
            }
            else if (Categories == "Optional") {
                // console.log("Check 4");
                await SubjectHandler.updateOne({ Course: Course, "Sem.semNumber": Sem }, {
                    $push: {
                        "Sem.$[semNumber].Subjects.Optional": id
                    }
                }, { arrayFilters: [{ "semNumber.semNumber": Sem }] })
                return
            }
        }

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

const AllSubjectAdd = async (req, res) => {
    try {
        const { Course, Sem, Subject_Code, Subject_Name, Categories } = req.body;

        if (!Course) {
            return res.status(404).send({ message: "Course is required" });
        } else if (!Sem) {
            return res.status(404).send({ message: "Sem is required" });
        } else if (!Subject_Code) {
            return res.status(404).send({ message: "Subject Code is required" });
        } else if (!Subject_Name) {
            return res.status(404).send({ message: "Subject Name is required" });
        } else if (!Categories) {
            return res.status(404).send({ message: "Categorie is required" });
        }

        const SearchData = await Subjects.findOne({ Course, Subject_Code });

        if (!SearchData) {
            const SubjectData = await Subjects(req.body);
            SubjectHandlerAdd(Course, Sem, Categories, SubjectData._id);
            await SubjectData.save();
            return res.status(200).send({ message: "Subject Add " });
        } else {
            return res.status(404).send({ message: "Subject All ready exist ", status: false });
        }

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

const TeacherSubjectSelect = async (req, res) => {
    try {
        const { Sem, Course, Teacher_id, Section, Subject_Code } = req.body;

        // console.log(Sem, Course, Teacher_id, Section, Subject_Code);

        const SearchData = await Subjects.findOne({ Course, Sem, Subject_Code });
        // console.log(SearchData);

        if (SearchData) {

            const Detailcheck = {
                status: false
            }

            SearchData.Teachers.map((value) => {
                // console.log(value);
                if (value.Section == Section && value.Teachers_id == Teacher_id) {
                    Detailcheck.status = true
                }
            })

            if (Detailcheck.status) {
                return res.status(404).send("Teacher all ready exist ");
            } else {
                await Subjects.updateOne({ Course, Sem, Subject_Code }, {
                    $push: {
                        Teachers: [{
                            Section: Section,
                            Teachers_id: Teacher_id
                        }]
                    }
                })
                return res.send("Data save");
            }

        } else {
            return res.send("Data Not found");
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}




module.exports = {
    AllSubjectAdd,
    TeacherSubjectSelect
}