const express = require('express')
const passport = require("passport");
const authRouter = express.Router();

const { authController } = require('../controllers')


authRouter.get('/kakao/callback', passport.authenticate('kakao', { session: false }), authController.kakaoLogin) // session 안 쓸거면 꺼야해

module.exports = { authRouter };

 