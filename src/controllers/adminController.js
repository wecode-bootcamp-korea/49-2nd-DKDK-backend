const { adminService } = require("../services");

const logIn = async (req, res) => {
  const { email, password } = req.body;
  await adminService.logIn(email, password);
};

const signUp = async (req, res) => {
  console.log("hi signUp");
};

module.exports = { logIn, signUp };
