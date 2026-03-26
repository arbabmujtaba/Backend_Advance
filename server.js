require("dotenv").config();
const connectDB = require("./src/config/db")

const app = require("./src/app")
connectDB();
app.listen(3001,()=>{
    console.log("Server running on port 3001")
})