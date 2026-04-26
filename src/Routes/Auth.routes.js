const express = require("express");

const authController = require("../Controllers/auth.controller");



const router = express.Router();
router.post("/register",authController.userRegistrationController)


router.post("/login",authController.userloginController)



module.exports = router;





// just a semantic change