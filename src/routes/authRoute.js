const express = require("express");
const passport = require("passport");
const { asyncWrap } = require("../middlewares/errorHandler");
const authRoute = express.Router();
const { authController } = require("../controllers");
const { socialLogin } = authController;

authRoute.get(
  "/kakao/callback",
  passport.authenticate("kakao", { session: false }),
  asyncWrap(socialLogin)
);
authRoute.get(
  "/naver/callback",
  passport.authenticate("naver", { session: false }),
  asyncWrap(socialLogin)
);

module.exports = { authRoute };
