const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const dbConnect = async() => {
    try {
        
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Mongodb connected successfully');

    } catch (error) {
        console.log(`error in connecting the database ${error}`);
    }
}

module.exports = dbConnect;