const express = require('express');
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 5000;



// just for checking
app.get("/", function(req,res) {
    return res.status(200).send("Everthing is working fine --");
})


//env 
const dotenv = require('dotenv');
dotenv.config();


app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));



app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    }  
    console.log(`Server started successfully on PORT : ${PORT}`);
})