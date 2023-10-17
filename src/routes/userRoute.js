const express = require('express')
const userRoute = express.Router();

const { userController } = require('../controllers')
const { detailSignUp } = userController;

userRoute.post('/signup', detailSignUp) 
//userRoute.post('/nicknameCheck') 

module.exports = { userRoute };