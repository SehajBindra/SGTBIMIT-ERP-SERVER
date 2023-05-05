const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const secretkey='secretkey';
dotenv.config();
const secretKey = process.env.JWT_SECRET;


const app = express();
function verifyToken(req,resp,next)
{
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        resp.send({
            result:'Token not valid'
        })
    }
}