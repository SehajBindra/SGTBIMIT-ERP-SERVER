const Subject = require('../models/Subjects');


const SubjectAdd = async (req, res) => {
    try {
        const { course, semNumber, Subject_Name, Subject_Code, Categories } = req.body;
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

    } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}


module.exports = {
    SubjectAdd
}