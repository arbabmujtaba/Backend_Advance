const mongoose = require("mongoose");

async function ConnectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
    return true;
  } catch (err) {
    console.log(err.message || err);
    return false;
  }
}

module.exports = ConnectToDb;
