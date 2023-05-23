const Semester = require('../models/Semester');
const fs = require('fs');
const Students = require("../models/student");
const Subjects = require("../models/Subjects");

// const SemesterPromote = async (req,res) =>{
//     try {
//         const {semNumber,course} = req.params;

//         const AllData = await Semester.find()
//         const SearchData = await Semester.findOne({"Sem.semNumber" : semNumber, "Sem.Courses.course" : course});

//         if(AllData.length)
//         {
//             return res.send("Kindly Add the Students");
//         }

//         const SemesterCheck = {
//             Status : false
//         }

//         if(SearchData || AllData.length){
//             AllData.map((value) =>{
//                 if(value.Sem.semNumber == semNumber+1){
//                     SemesterCheck.Status = true
//                 }
//             });
//         }

//         if(SemesterCheck.Status){
//             const result = semNumber+1/2;
//             return res.status(200).send(`${result == 0 ? "Kindly Please delete the Even data" : "Kindly Please delete the Odd Data"}`)
//         }else{
//             await Semester.updateOne({"Sem.semNumber" : semNumber},{
//                 "Sem.semNumber" : semNumber+1
//             })
//         }




//         // const CourseCheck = {
//         //     Status : false
//         // }

//         // if(SearchData || AllData.length){
//         //     AllData.map((value) =>{
//         //         if(value.Sem.semNumber == semNumber+1){
//         //             if(value.Sem.Courses.length == 0){
//         //                 CourseCheck.Status = true
//         //             }
//         //         }
//         //     });
//         // }


//         // if(CourseCheck){
//         //     await Semester.updateOne({"Sem.semNumber" : semNumber+1},{
//         //         $set : {
//         //             Sem : SearchData.Sem.Courses
//         //         }
//         //     })

//         //     return res.Status(200).send("Courses Permoted")
//         // }





//     } catch (error) {
//         console.log(error);
//     }
// }

const SemesterPromote = async (req, res) => {
    try {
        const { semNumber } = req.params;

        // console.log(typeof semNumber);

        const SearchData = await Semester.findOne({ "Sem.semNumber": Number(semNumber) + 1 });
        // console.log(SearchData);

        if (SearchData) {
            const result = Number(semNumber) + 1 / 2;
            return res.status(200).send(`${result == 0 ? "Kindly Please delete the Even data" : "Kindly Please delete the Odd Data"}`)
        } else {
           

            const DefaultSubjectData = {
                data : "",
                status : false
            }

            
            const SlectiveData = await Semester.findOne({"Sem.semNumber" : Number(semNumber)});
            // console.log(SlectiveData);

            SlectiveData.Sem.Courses.map(async(value) => {
                // console.log(value)
                const SubjectData = await Subjects.findOne({Course : value.course, "Sem.semNumber" : Number(semNumber) + 1})
                // console.log(SubjectData);
                if(SubjectData){
                    SubjectData.Sem.map((value)=>{
                        if(value.semNumber == Number(semNumber) + 1){
                            console.log(value);
                            DefaultSubjectData.status = true,
                            DefaultSubjectData.data = value.Subjects.Default;
                        }
                    })
                }
                console.log(DefaultSubjectData);

                value.Sections.map((value) => {
                    value.StudentsIDs.map(async (value) => {
                        // await Students.updateOne({_id : value.stu_id},{
                        //     semester : Number(semNumber) + 1,
                        //     Subjects :{

                        //     }
                        // })
                    })
                })
            })

             // await Semester.updateOne({ "Sem.semNumber": semNumber }, {
            //     "Sem.semNumber": Number(semNumber) + 1
            // })

            return res.status(200).send("Courses Permoted")
        }
    } catch (error) {
        console.log(error);
    }
}




module.exports = {
    SemesterPromote,
}