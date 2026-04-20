const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
/**
 * -User registration controller nigga
 * 
*/
async function UserRegisterController(req, res) {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        message: "Email, password and name are required",
        status: "failed",
      });
    }

    const ifExists = await userModel.findOne({ email });

    if (ifExists) {
      return res.status(400).json({
        message: "User already exists",
        status: "failed",
      });
    }

    const user = await userModel.create({
      email,
      password,
      name,
    });

    const token = jwt.sign(
      { userID: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);

    return res.status(201).json({
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Internal server error",
      status: "failed",
    });
  }
}

/** 
 * -User Login Controller
*/
async function UserLoginController(req,res){
    const {email,password}=req.body;
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(401).json({
            message:"User email/password is not valid"
        })
    }
}

module.exports = { UserRegisterController,UserLoginController};
