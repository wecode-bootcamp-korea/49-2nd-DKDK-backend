const express = require('express');
const { mypageController } = require('../controllers');

const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', mypageController.mypageView);
// mypageRouter.patch('/', mypageControllers);

module.exports = { userHealthInfoRouter }