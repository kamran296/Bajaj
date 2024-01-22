const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    data: { type: JSON, unique: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BankUser", customerSchema);
