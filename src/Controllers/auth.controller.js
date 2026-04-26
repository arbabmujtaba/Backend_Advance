const usermodel = require("../models/user.model");
const jwt = require("jsonwebtoken");
/**
* -  user registration controller hai yeh yeahan se user register karaga
* - POST /api/auth/register
*/
async function userRegistrationController(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and password are required"
      });
    }

    const ifExists = await usermodel.findOne({ email });
    if (ifExists) {
      return res.status(422).json({
        success: false,
        message: "User already exists"
      });
    }

    const user = await usermodel.create({ name, email, password });
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        id: user._id
      },
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
      error: error.message
    });
  }
}
/**
 * - user login controller
 * - POST /api/auth/login
 */
async function userloginController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    const user = await usermodel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax"
    });

    return res.status(200).json({
      message: "User login successful",
      success: true,
      token
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login user",
      error: error.message
    });
  }
}

module.exports = {
  userRegistrationController,
  userloginController
};
