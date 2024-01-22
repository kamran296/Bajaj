const mongoose = require("mongoose");

const policyPurchaseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dys: {
    type: Boolean,
    default: false,
  },
  phone: { type: Number, required: true },
  income: { type: Number, required: true },
  pin: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
  },
  payTill: {
    type: Number,
  },
  nominee: {
    type: String,
  },
  paymentFreq: {
    type: Number,
  },
});

module.exports = mongoose.model("PolicyPurchase", policyPurchaseSchema);
