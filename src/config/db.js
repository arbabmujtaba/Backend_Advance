const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Server is connected to db");
        return true;
    } catch (error) {
        console.log("Database connection failed:", error.message);
        return false;
    }
}

module.exports = connectDB
