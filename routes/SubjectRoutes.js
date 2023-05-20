const express = require('express');
const routes = express.Router();
const {SubjectAdd,SubjectDelete,SubjectSemDelete} = require("../controllers/SubjectController")

//Subject Add
routes.post("/Subject_Add",SubjectAdd);

//Subject Delete
routes.delete("/Subject_Delete/:course/:semNumber/:Subject_Code",SubjectDelete)

//Subject Update
routes.delete("/Subject_Sem_Delete/:course/:semNumber",SubjectSemDelete)
module.exports = routes