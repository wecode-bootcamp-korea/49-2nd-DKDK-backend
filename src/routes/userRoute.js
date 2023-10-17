const express = require('express')
const passport = require("passport");
const userRouter = express.Router();

const { userController } = require('../controllers')


// NEW_USER 메세지를 받아서 넘기거나, 해당 유저한테 userType이 없는 경우 상세페이지로 넘어감 
authRouter.post('/signup',  authController.kakaoLogin) 

module.exports = { userRouter };