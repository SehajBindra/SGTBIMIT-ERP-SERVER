const express = require('express');
const routes = express.Router();
const {SubjectAdd} = require("../controllers/SubjectController")


routes.post("/Subject_Add",SubjectAdd);

module.exports = routes