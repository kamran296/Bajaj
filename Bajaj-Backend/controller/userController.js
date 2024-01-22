const Users = require("./../models/Users");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const nodemailer = require("nodemailer");
const axios = require("axios");
const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: "kamrankhot29@gmail.com",
    pass: process.env.email_password,
  },
});

let otp;
function otpGenerator() {
  return Math.floor(1000 + Math.random() * 9000);
}
otp = otpGenerator();
let response_data, user;
module.exports.registerUser = async (req, res) => {
  let success = false;
  try {
    const { email, phone, pan, password, dob } = req.body;
    const emailExist = await Users.findOne({ email });
    const phoneExist = await Users.findOne({ phone: req.body.phone });
    const panExist = await Users.findOne({ pan: req.body.pan });

    if (emailExist || phoneExist || panExist) {
      res.status(404).json("Customer already exists");
    }

    // PAN verificaion
    let pan_number = pan;

    const options = {
      method: "POST",
      url: "https://api.gridlines.io/pan-api/fetch-detailed",
      headers: {
        "X-Auth-Type": "API-Key",
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-API-Key": "QUA5JCgvM6MNXOuQFNTdWwLCtG1rkEEL",
      },
      data: { pan_number: `${pan_number}`, consent: "Y" },
    };

    async function fetchData() {
      try {
        const { data } = await axios.request(options);
        response_data = data;
        return data.data.pan_data.document_id;
      } catch (error) {
        return error;
      }
    }

    const response_pan = await fetchData();

    if (response_pan !== pan) {
      res.status(400).json("wrong PAN details");
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
    user = new Users({
      email,
      phone,
      pan,
      password: secPass,
      dob,
      data: response_data,
    });
    user = await user.save();
    const data = {
      user: {
        id: user,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    const info = await transporter.sendMail({
      from: '"Bajaj" <Bajaj.com>', // sender address
      to: email, // list of receivers
      subject: "Successful registeration  at bajaj ✔", // Subject line
      text: `Congratulations for successfully registering on Bajaj `, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });

    success = true;
    res.status(200).json({ success, authtoken });
    console.log("Message sent: %s", info.messageId);
    //   now sending an otp to Customer as he is registering
  } catch (e) {
    return "error in registering";
    // res.status(500).json({ success, error: e.message });
  }
};

// login
module.exports.login = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt);
  let success = false;
  const { email, password } = req.body;

  try {
    user = await Users.findOne({ email });
    const pass = user.password;

    if (!user) {
      return res.status(400).json({ error: "invalid login credential" });
    }

    const passwordCompare = await bcrypt.compare(password, pass);
    if (!passwordCompare) {
      success = false;
      return res.status(400).json({ error: "invalid login credential" });
    }

    // email otp verification
    const info = await transporter.sendMail({
      from: '"Kavach" <kavach.com>', // sender address
      to: email, // list of receivers
      subject: "OTP verification from Kavach ✔", // Subject line
      text: `Your OTP is ${otp}`, // plain text body
      // html: "<b>Hello world?</b>", // html body
    });
    console.log("Message sent: %s", info.messageId);
    success = true;
    res.status(200).json({ success });
  } catch (err) {
    res.status(400).json({
      status: "error from login side",
      message: err,
    });
  }
};

module.exports.loginVerify = async (req, res) => {
  try {
    let votp = req.body.otp;
    if (otp !== votp) {
      res.status(404).json("wrong otp entered");
    }

    const data = {
      user: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET, { expiresIn: "1h" });
    success = true;
    res.status(200).json({
      success,
      authToken,
    });
  } catch (e) {
    return "error in login ";
  }
};

// LoginData
module.exports.loginData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await Users.findById(userId).select("-password");
    res.status(200).json({
      user: user,
    });
  } catch (err) {
    res.status(400).json({
      status: "error from login data side",
      message: err,
    });
  }
};
