const express = require('express')
const userRoute = express.Router();

const { userController } = require('../controllers')
const { updateUserInfo, checkDuplicateNickname } = userController;

userRoute.post('/signup', updateUserInfo) 
userRoute.post('/nicknameCheck', checkDuplicateNickname) 

module.exports = { userRoute };