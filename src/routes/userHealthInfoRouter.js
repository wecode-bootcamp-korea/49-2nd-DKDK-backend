const express = require('express');
const { userHealthInfoController } = require('../controllers');
const { validateToken } = require('../middlewares/auth');
const { handleImageUpload } = require('../utils/s3Service')
const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', validateToken, userHealthInfoController.viewUserHealthInfo);
userHealthInfoRouter.get('/get', validateToken, userHealthInfoController.getUpdatingUserInfo);
userHealthInfoRouter.post('/', validateToken, handleImageUpload, userHealthInfoController.updateUserHealthInfo);

module.exports = { userHealthInfoRouter };