const express = require('express')
const userRoute = express.Router();
const { validateToken } = require('../middlewares/auth');
const { asyncWrap } = require('../middlewares/errorHandler');
const { userController } = require('../controllers')
const { updateUserInfo, checkDuplicateNickname } = userController;

userRoute.post('/signup', validateToken, asyncWrap(updateUserInfo)) 
userRoute.post('/nicknameCheck', asyncWrap(checkDuplicateNickname)) 

module.exports = { userRoute };