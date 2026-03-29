const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
async function UserRegisterController (req,res){
    const {email,password,name} = req.body
    const Ifexists = userModel.findOne({
        email: email
    })
    if(Ifexists){
        res.status(400).json({
            message:"User Already Exists",
            status:failed
        })
    }
    const user = await userModel.create({
        email, password, name
    })
    const token = jwt.sign({userID:user.id},process.env.JWT_SECRET,{expiresIn:"1d"})
        res.cookie("token",token)
        res.status(201).json({
            user:{
                _id: user.id,
                name: user.name,
                email: user.email
            },
            token
        })
}


module.exports ={UserRegisterController}