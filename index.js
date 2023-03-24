const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;



// just for checking
app.get("/", function(req,res) {
    return res.status(200).send("Everthing is working fine --");
})


app.listen(PORT, function (error) {
    if (error) {
        console.log(error);
    }  
    console.log(`Server started successfully on PORT : ${PORT}`);
})