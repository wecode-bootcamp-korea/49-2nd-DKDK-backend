const express = require('express')
const userRoute = express.Router();
const { auth, errorHandler } = require('../middlewares');
const { asyncWrap } =  errorHandler;
const { validateToken } = auth;

const { userController } = require('../controllers')
const { updateUserInfo, checkDuplicateNickname } = userController;

userRoute.post('/signup', validateToken, asyncWrap(updateUserInfo)) 
userRoute.post('/nicknameCheck', validateToken, asyncWrap(checkDuplicateNickname)) 

module.exports = { userRoute };