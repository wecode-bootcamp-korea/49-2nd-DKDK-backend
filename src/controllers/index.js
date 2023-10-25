const authController = require("./authController");
const userController = require("./userController");
const userHealthInfoController = require("./userHealthInfoController");
const readController = require("./recordController");
const subscriptionController = require("./subscriptionController")

module.exports = {
  authController,
  userController,
  userHealthInfoController,
  readController,
  subscriptionController,
};
