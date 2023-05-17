// const superAdminModel = require("../models/superAdmin");
const facultyModel = require("../models/faculty");
const adminModel = require("../models/admin");

// const issuperAdmin = async (req, res, next) => {
//     try {
//       const user = await superAdminModel.findOne(req.body._id);
//       if (user.role !== 0) {
//         return res.status(401).send({
//           success: false,
//           message: "UnAuthorized Access",
//         });
//       } else {
//         next();
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(401).send({
//         success: false,
//         error,
//         message: "Error in admin middelware",
//       });
//     }
//   };




const isAdmin = async (req, res, next) => {
    try {
      const user = await facultyModel.findById(req.body._id);
      if (user.role !== 1) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in faculty middelware",
      });
    }
  };


const isFaculty = async (req, res, next) => {
    try {
      const user = await facultyModel.findById(req.body._id);
      if (user.role !== 2) {
        return res.status(401).send({
          success: false,
          message: "UnAuthorized Access",
        });
      } else {
        next();
      }
    } catch (error) {
      console.log(error);
      res.status(401).send({
        success: false,
        error,
        message: "Error in faculty middelware",
      });
    }
  };


  module.exports =  isAdmin, isFaculty;