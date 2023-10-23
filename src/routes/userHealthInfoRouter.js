const express = require('express');
const {userHealthInfoController} = require('../controllers');
// const { upload } = require('../utils/S3')

const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', userHealthInfoController.viewUserHealthInfo);
userHealthInfoRouter.get('/update', userHealthInfoController.getUpdatingUserInfo);
userHealthInfoRouter.patch('/', userHealthInfoController.updateUserHealthInfo);
userHealthInfoRouter.post('/', userHealthInfoController.userProfileImgUpload);
// userHealthInfoRouter.post('/', auth, upload, userHealthInfoController.userProfileImgUpload); // auth가 먼저, upload 보다
module.exports = { userHealthInfoRouter }