const express = require('express');
const { userHealthInfoController } = require('../controllers');

const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', userHealthInfoController.viewUserHealthInfo);
// mypageRouter.patch('/', mypageControllers);

module.exports = { userHealthInfoRouter }