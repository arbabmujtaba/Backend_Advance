const mongoose = require("mongoose");

const connectDB = async()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log("Server is connected to db")
        })
    }
    catch{
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB