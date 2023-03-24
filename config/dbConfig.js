const mongoose = require('mongoose');
// mongoose.set('strictQuery', false);

const dbConnect = async() => {
    try {
        
        await mongoose.connect("mongodb://127.0.0.1:27017/ERP", {
            useUnifiedTopology : true,
            useNewUrlParser : true,
        });
        console.log('Mongodb connected successfully');

    } catch (error) {
        console.log(`error in connecting the database ${error}`);
    }
}

module.exports = dbConnect;