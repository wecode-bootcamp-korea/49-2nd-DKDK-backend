const { userHealthInfoDao } = require('../models');
const { throwError } = require('../utils/throwError');

const getUserInfo = async (userId) => {
  const exist = await userHealthInfoDao.checkExistence(userId);

  if (!exist) throwError(400, "KEY_ERROR_NO_SUCH_USER");
  const bmiCalculator = () => {
    const height = userInfo[0].height;
    const weight = userInfo[0].weight;
    const bmi = weight / Math.sqrt(height);
    if (bmi < 18.5) return 1800;
    if (bmi >= 18.5 && bmi <= 23) return 1600;
    if (bmi > 23) return 1400;
  };

  const userInfo = await userHealthInfoDao.userInfo(userId);
  const trainerInfo = await userHealthInfoDao.trainerInfo(userId);
  const ptOrderInfo = await userHealthInfoDao.ptOrderInfo(userId);
  const subOrderInfo = await userHealthInfoDao.subOrderInfo(userId);
  const workoutRcmd = await userHealthInfoDao.workoutRcmd(userId);
  const foodRcmd = await userHealthInfoDao.foodRcmd(bmiCalculator());

  return {
    userInfo: userInfo,
    trainerInfo: trainerInfo,
    ptOrderInfo: ptOrderInfo,
    subOrderInfo: subOrderInfo,
    foodRcmd: foodRcmd,
    workoutRcmd: workoutRcmd,
  };
};

module.exports = {
  getUserInfo,
};

