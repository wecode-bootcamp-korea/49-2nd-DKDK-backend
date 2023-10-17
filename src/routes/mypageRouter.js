const express = require('express');
const { mypageController } = require('../controllers');

const mypageRouter = express.Router();

mypageRouter.get('/', mypageController.mypageView);
// mypageRouter.patch('/', mypageControllers);

module.exports = { mypageRouter }