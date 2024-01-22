const express = require("express");
const router = express.Router();
const bankCustomer = require("./../controller/bankController");
router.route("/bankDetail").post(bankCustomer.createCustomer);

module.exports = router;
