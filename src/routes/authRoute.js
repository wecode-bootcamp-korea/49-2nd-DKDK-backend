const express = require('express')
const passport = require("passport");
const authRoute = express.Router();

const { authController } = require('../controllers')
const { kakaoLogin } = authController; 


authRoute.get('/kakao/callback', passport.authenticate('kakao', { session: false }), kakaoLogin) // session 안 쓸거면 꺼야해

module.exports = { authRoute };

 