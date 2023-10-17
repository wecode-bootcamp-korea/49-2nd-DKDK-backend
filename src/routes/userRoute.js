const express = require('express')
const userRoute = express.Router();

const { userController } = require('../controllers')
const { detailSignUp } = userController;


// NEW_USER 메세지를 받아서 넘기거나, 해당 유저한테 userType이 없는 경우 상세페이지로 넘어감 
userRoute.post('/signup', detailSignUp) 
//userRoute.post('/nicknameCheck') 

module.exports = { userRoute };