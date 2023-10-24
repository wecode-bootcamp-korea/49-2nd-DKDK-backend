const express = require('express');
const {userHealthInfoController} = require('../controllers');
const {validateToken} = require('../middlewares/auth');
// const { upload } = require('../utils/S3')

const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', validateToken, userHealthInfoController.viewUserHealthInfo);
userHealthInfoRouter.get('/update', validateToken, userHealthInfoController.getUpdatingUserInfo);
userHealthInfoRouter.patch('/', validateToken, userHealthInfoController.updateUserHealthInfo);
userHealthInfoRouter.post('/', validateToken, userHealthInfoController.userProfileImgUpload); // 사진 따로 ..
// userHealthInfoRouter.post('/', validateToken, upload, userHealthInfoController.userProfileImgUpload); // auth가 먼저, upload 보다
module.exports = {userHealthInfoRouter};