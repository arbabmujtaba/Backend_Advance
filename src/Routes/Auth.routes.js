const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.controller")



router.post("/register",authController.UserRegisterController)
router.post("/Login",authController.UserLoginController)





module.exports = router;