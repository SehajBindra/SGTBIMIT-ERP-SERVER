const studentModel = require("../models/student");
const facultyModel = require("../models/faculty");

const isAdmin = async (req, res, next) => {
    try {
      const user = await studentModel.findById(req.body._id);
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
        message: "Error in admin middelware",
      });
    }
  };


const isFaculty = async (req, res, next) => {
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
        message: "Error in admin middelware",
      });
    }
  };


  module.exports = isAdmin, isFaculty;