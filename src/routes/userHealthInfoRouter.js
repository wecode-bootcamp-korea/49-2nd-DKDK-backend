const express = require('express');
const {userHealthInfoController} = require('../controllers');

const userHealthInfoRouter = express.Router();

userHealthInfoRouter.get('/', userHealthInfoController.viewUserHealthInfo);
userHealthInfoRouter.get('/update', userHealthInfoController.getUpdatingUserInfo);
userHealthInfoRouter.patch('/', userHealthInfoController.updateUserHealthInfo);
userHealthInfoRouter.post('/', userHealthInfoController.userProfileImgUpload);

module.exports = { userHealthInfoRouter }