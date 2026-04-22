const express = require("express");

const authController = require("../Controllers/auth.controller");




const router = express.Router();
router.post("/register",authController.userRegistrationController)



module.exports = router;