const { userHealthInfoDao } = require('../models');
const { throwError } = require('../utils/throwError');

const getUserInfo = async (userId, workoutRcmdLimit) => {
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

  const userInfo = await userHealthInfoDao.getUser(userId);
  const trainerInfo = await userHealthInfoDao.getTrainerInfo(userId);
  const ptOrderInfo = await userHealthInfoDao.getPtOrderByUserId(userId);
  const subOrderInfo = await userHealthInfoDao.getSubOrdersInfoByUserId(userId);
  const workoutRcmd = await userHealthInfoDao.getRandWorkoutByUserId(userId, workoutRcmdLimit);
  const foodRcmd = await userHealthInfoDao.getRandFoodByGrade(bmiCalculator());

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

