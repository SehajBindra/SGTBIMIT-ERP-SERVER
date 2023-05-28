const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const secretKey = process.env.JWT_SECRET;
const adminModel = require('../models/admin');
const Faculty = require("../models/faculty");
const Student = require("../models/student")


const verifyToken = (req, res, next) => {
    try {
        console.log(req.headers.authtok);
        jwt.verify(req.headers.authtok, secretKey, (err, auth) => {
            if (auth) {
                req.user = auth
                next()
            }
            else {
                console.log(err);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


const isSuperAdmin = async (req, res, next) => {
    try {
        const user = await adminModel.findById(req.user._id).select("-password");
        console.log("yes");
        if (user.role !== 0) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        } else {
            console.log("GO");
            next()
        }
    } catch (error) {
        console.log(error);
    }
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await adminModel.findById(req.user._id).select("-password");
        console.log("NO");

        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        } else {
            console.log("GO");
            next()
        }
    } catch (error) {
        console.log(error);
    }
}


const isAdminsRoleCheck = async (req, res, next) => {
    try {
        const user = await adminModel.findById(req.user._id).select("-password");
        if (user.role == 1 || user.role == 0) {
            next()
        } else {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const isFaculty = async (req,res,next) =>{
    try {
        const user = await Faculty.findById(req.user._id).select("-password");
        if(user.role == 3){
            next()
        }else{
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }
    } catch (error) {
        console.log(error);
    }
}

const isStudent = async (req,res,next) =>{
    try {
        const user = await Student.findById(req.user._id).select("role");

        if(user.role == 2){
            req._id = req.user._id
            next()
        }else{
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access"
            })
        }
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    verifyToken,
    isSuperAdmin,
    isAdmin,
    isAdminsRoleCheck,
    isFaculty,
    isStudent
};