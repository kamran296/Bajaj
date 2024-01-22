const express = require("express");
const authController = require("./../controller/userController");
const loginData = require("./../middleware/loginData");
const router = express.Router();

router.route("/register").post(authController.registerUser);
router.route("/login").post(authController.login);
router.route("/loginData").get(loginData, authController.loginData);
router.route("/otpVerify").post(authController.loginVerify);
module.exports = router;
