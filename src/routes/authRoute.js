const express = require('express')
const passport = require("passport");
const { asyncWrap } = require('../middlewares/errorHandler');
const authRoute = express.Router();
const { authController } = require('../controllers')
const { kakaoLogin } = authController; 

authRoute.get('/kakao/callback', passport.authenticate('kakao', { session: false }), asyncWrap(kakaoLogin))

module.exports = { authRoute };

 