const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Email is required"],
        trim:true,
        lowercase:true,
        match:[/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/],
        unique:true
    },
    name:{
        type:String,
        required:[true,"Name is required"],
        trim:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        trim:true,
        select:false
    }
},
{
    timestamps:true
})

userSchema.pre("save",async function (next) {
    if(!this.isModified("password")) {
        return next()
    };
    const hash = await bcrypt.hash(this.password,12)
    this.password = hash
    next()
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password,this.password)
}
const userModel = mongoose.model("User", userSchema)
module.exports = userModel;
