const express = require('express')
const userRoute = express.Router();

const { userController } = require('../controllers')
const { updateUserInfo } = userController;

userRoute.post('/signup', updateUserInfo) 
//userRoute.post('/nicknameCheck') 

module.exports = { userRoute };