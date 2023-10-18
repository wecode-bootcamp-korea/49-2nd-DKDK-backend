const { mypageDao } = require("../models");

const mypage = async (userId) => {
  const bmiCalculator = () => {
    const height = userInfo[0].height;
    const weight = userInfo[0].weight;
    const bmi = weight / Math.sqrt(height);
    if (bmi < 18.5) return 1800;
    if (bmi >= 18.5 && bmi <= 23) return 1600;
    if (bmi > 23) return 1400;
  };

  const userInfo = await mypageDao.userInfo(userId);
  const trainerInfo = await mypageDao.trainerInfo(userId);
  const ptOrderInfo = await mypageDao.ptOrderInfo(userId);
  const subOrderInfo = await mypageDao.subOrderInfo(userId);
  const workoutRcmd = await mypageDao.workoutRcmd(userId);
  const foodRcmd = await mypageDao.foodRcmd(bmiCalculator());

  return {
    userInfo: userInfo,
    trainerInfo: trainerInfo,
    ptOrderInfo: ptOrderInfo,
    subOrderInfo: subOrderInfo,
    foodRcmd: foodRcmd,
    workoutRcmd: workoutRcmd,
  };
};

// const updateMypage = async (
//   nickname,
//   profileImg,
//   height,
//   weight,
//   workoutLoad,
//   interestedWorkout,
//   userId
// ) => {
//   try {
//     await mypageDao.userUpdate(
//       nickname,
//       profileImg,
//       height,
//       weight,
//       workoutLoad,
//       interestedWorkout,
//       userId
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };

module.exports = {
  mypage,
  // updateMypage,
};
