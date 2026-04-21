const mongoose = require("mongoose");
function connecttodb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to MongoDB")
        return true;  
    })  
    .catch((err)=>{
        console.log(err)
        return process.exit(1);
    })
}
module.exports = Connecttodb;