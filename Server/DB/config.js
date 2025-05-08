const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;
const port = process.env.PORT;

const connectDB = async ()=>{
    try{
        await mongoose.connect(DB_URL);
        console.log('Database Connected Successfully');
    }catch(error){
        console.log(error.message);
    }
}
module.exports = { connectDB,port };