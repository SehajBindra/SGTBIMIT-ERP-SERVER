const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();
const secretKey = process.env.JWT_SECRET;


const verifyToken = (req,res,next) =>{
    try {
        jwt.verify(req.headers.authTOK,secretKey,(err,auth)=>{
            if(auth){
                next()
            }
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = verifyToken;