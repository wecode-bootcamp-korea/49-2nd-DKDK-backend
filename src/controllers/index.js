const trainerMatchingController = require("./trainerMatchingController");
const authController = require("./authController");
const userController = require("./userController");
const userHealthInfoController = require("./userHealthInfoController");
const readController = require("./recordController");

module.exports = {
  authController,
  userController,
  userHealthInfoController,
  readController,
  trainerMatchingController,
};
