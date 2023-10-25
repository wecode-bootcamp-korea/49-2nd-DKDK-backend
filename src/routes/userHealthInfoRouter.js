const express = require('express');
const { userHealthInfoController } = require('../controllers');
const { validateToken } = require('../middlewares/auth');
const { handleImageUpload } = require('../utils/s3Service')
const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', validateToken, userHealthInfoController.viewUserHealthInfo);
userHealthInfoRouter.get('/update', validateToken, userHealthInfoController.getUpdatingUserInfo);
userHealthInfoRouter.post('/', validateToken, handleImageUpload, userHealthInfoController.updateUserHealthInfo);
userHealthInfoRouter.post('/test', handleImageUpload, userHealthInfoController.imgUploadTest,);

module.exports = { userHealthInfoRouter };