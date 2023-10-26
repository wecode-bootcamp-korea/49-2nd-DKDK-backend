const express = require("express");
const { userHealthInfoController } = require("../controllers");
const { validateToken } = require("../middlewares/auth");
const { handleImageUpload } = require("../utils/s3Service");
const userHealthInfoRoute = express.Router();

userHealthInfoRoute.get(
  "/",
  validateToken,
  userHealthInfoController.viewUserHealthInfo
);
userHealthInfoRoute.get(
  "/get",
  validateToken,
  userHealthInfoController.getUpdatingUserInfo
);
userHealthInfoRoute.post(
  "/",
  validateToken,
  handleImageUpload,
  userHealthInfoController.updateUserHealthInfo
);

module.exports = { userHealthInfoRoute };
