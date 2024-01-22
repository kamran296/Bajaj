const BankUser = require("./../models/BankUser");

module.exports.createCustomer = async (req, res) => {
  try {
    const data = await req.body;
    console.log(data, "12435343");
    if (!data.email || data.email === undefined) {
      // Set a default email value or handle the null email case
      data.email = "unknown@example.com";
    }
    const existingUser = await BankUser.findOne({ email: data.email });
    if (existingUser) {
      // Handle the case when the email is not null but already exists in the database
      return res.status(400).json({ error: "Email must be unique" });
    }

    const user = new BankUser(data);
    await user.save();
  } catch (err) {
    console.log(err);
    return "error in fetching the bank customer data";
  }
};
