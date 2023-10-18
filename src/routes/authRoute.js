const express = require('express')
const passport = require("passport");
const authRoute = express.Router();

const { authController } = require('../controllers')
const { kakaoLogin } = authController; 

authRoute.get('/kakao/callback', passport.authenticate('kakao', { session: false }), kakaoLogin)

module.exports = { authRoute };

 