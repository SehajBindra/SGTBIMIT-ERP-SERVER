const Subject = require('../models/Subjects');

const SubjectAdd = async (req, res) => {
    try {
        const { course, semNumber, Subject_Name, Subject_Code, Categories } = req.body;

        const SubjectSearch = await Subject.findOne({ Course: course, $or: [{ "Sem.Subjects.Default.Subject_Code": Subject_Code }, { "Sem.Subjects.Optional.Subject_Code": Subject_Code }] });

        if (SubjectSearch) {
            return res.status(200).send({ message: "Subject All ready exist", status: false });
        } else {
            const SearchData = await Subject.findOne({ Course: course });
            const SemResult = {
                data: "",
                result: false
            }
            if (!SearchData) {
                if (Categories === "Default") {
                    await Subject({
                        Course: course,
                        Sem: [{
                            semNumber: semNumber,
                            Subjects: {
                                Default: [{
                                    Subject_Name,
                                    Subject_Code
                                }]
                            }
                        }]
                    }).save()
                    return res.send("Subject Add")
                } else if (Categories === "Optional") {
                    await Subject({
                        Course: course,
                        Sem: [{
                            semNumber: semNumber,
                            Subjects: {
                                Optional: [{
                                    Subject_Name,
                                    Subject_Code
                                }]
                            }
                        }]
                    }).save()
                    return res.send("Subject Add")
                }
            } else {
                SearchData.Sem.map((value) => {
                    console.log(value);
                    if (value.semNumber === semNumber) {
                        SemResult.data = value,
                            SemResult.result = true
                    }
                })
            }
            if (SemResult.result) {
                console.log("Result");
                if (Categories === "Default") {
                    await Subject.updateOne({ Course: course, "Sem.semNumber": semNumber }, {
                        $push: {
                            "Sem.$[semNumber].Subjects.Default": [{
                                Subject_Name,
                                Subject_Code
                            }]
                        }
                    }, { arrayFilters: [{ "semNumber.semNumber": semNumber }] })

                    return res.send("Subject Add")

                } else if (Categories === "Optional") {
                    await Subject.updateOne({ Course: course, "Sem.semNumber": semNumber }, {
                        $push: {
                            "Sem.$[semNumber].Subjects.Optional": [{
                                Subject_Name,
                                Subject_Code
                            }]
                        }
                    }, { arrayFilters: [{ "semNumber.semNumber": semNumber }] })

                    return res.send("Subject Add")

                }
            } else {
                console.log("Enter");
                if (Categories === "Default") {
                    await Subject.updateOne({ Course: course }, {
                        $push: {
                            Sem: [{
                                semNumber: semNumber,
                                Subjects: {
                                    Default: [{
                                        Subject_Name,
                                        Subject_Code
                                    }]
                                }
                            }]
                        }
                    })

                    return res.send("Subject Add")

                } else if (Categories === "Optional") {
                    await Subject.updateOne({ Course: course }, {
                        $push: {
                            Sem: [{
                                semNumber: semNumber,
                                Subjects: {
                                    Optional: [{
                                        Subject_Name,
                                        Subject_Code
                                    }]
                                }
                            }]
                        }
                    })

                    return res.send("Subject Add")

                }
            }
        }


    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}
const SubjectDelete = async (req, res) => {
    try {

        const { course, semNumber, Subject_Code } = req.params
        const SubjectSearch = await Subject.findOne({ Course: course, $or: [{ "Sem.Subjects.Default.Subject_Code": Subject_Code }, { "Sem.Subjects.Optional.Subject_Code": Subject_Code }] });

        if (!SubjectSearch) {
            return res.status(404).send({ message: "Subject Not Found", status: false })
        } else {
            SubjectSearch.Sem.map((value) => {
                if (value.semNumber == semNumber) {
                    value.Subjects.Default.map(async (value) => {
                        if (value.Subject_Code == Subject_Code) {
                            await Subject.updateOne({ Course: "BCA" }, { $pull: { "Sem.$[semNumber].Subjects.Default": { _id: value._id } } },
                                { arrayFilters: [{ "semNumber.semNumber": semNumber }] })
                            return res.send("data delete")
                        }
                    })
                    value.Subjects.Optional.map(async (value) => {
                        if (value.Subject_Code == Subject_Code) {
                            await Subject.updateOne({ Course: "BCA" }, { $pull: { "Sem.$[semNumber].Subjects.Optional": { _id: value._id } } },
                                { arrayFilters: [{ "semNumber.semNumber": semNumber }] })
                            return res.send("data delete")
                        }
                    })
                }
            })
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}




const SubjectSemDelete = async (req, res) => {
    try {
        const { course, semNumber } = req.params;

        const SearchData = await Subject.findOne({ Course: course, "Sem.semNumber": semNumber });

        if (SearchData) {
            await Subject.updateOne({ Course: course }, { $pull: { Sem: { semNumber } } })
            return res.status(200).send("Semester Delete")
        }
    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}


module.exports = {
    SubjectAdd,
    SubjectDelete,
    SubjectSemDelete
}