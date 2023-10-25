const express = require('express')
const subscriptionRoute = express.Router();
const { validateToken } = require('../middlewares/auth');
const { asyncWrap } = require('../middlewares/errorHandler');
const { subscriptionController } = require('../controllers')
const { subscriptionPayment } = subscriptionController;

subscriptionRoute.post('/', validateToken, asyncWrap(subscriptionPayment)) 

module.exports = { subscriptionRoute };