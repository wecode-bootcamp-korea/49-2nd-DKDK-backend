const { mypageDao } = require("../models");

const mypage = async (userId, grade) => {
  try {
    const isTrainer = await mypageDao.checkTrainer(userId)
    console.log("T/F", isTrainer)
    if (isTrainer != true) {
      const userInfo = await mypageDao.userInfo(userId);
      // console.log('1',userInfo);
      // console.log('2',trainerInfo);
      const ptOrderInfo = await mypageDao.ptOrderInfo(userId);
      // console.log('3',ptOrderInfo);
      const subOrderInfo = await mypageDao.subOrderInfo(userId);
      // console.log('4',subOrderInfo);
      const foodRcmd = await mypageDao.foodRcmd(grade);
      // console.log('5',foodRcmd);
      const workoutRcmd = await mypageDao.workoutRcmd(userId);
      // console.log('6',workoutRcmd);
      return {
        'userInfo': userInfo,
        'ptOrderInfo': ptOrderInfo,
        'subOrderInfo': subOrderInfo,
        'foodRcmd': foodRcmd,
        'workoutRcmd': workoutRcmd,
      };
    } else {
      const userInfo = await mypageDao.userInfo(userId);
      // console.log('1',userInfo);
      const trainerInfo = await mypageDao.trainerInfo(userId);
      // console.log('2',trainerInfo);
      const ptOrderInfo = await mypageDao.ptOrderInfo(userId);
      // console.log('3',ptOrderInfo);
      const subOrderInfo = await mypageDao.subOrderInfo(userId);
      // console.log('4',subOrderInfo);
      const foodRcmd = await mypageDao.foodRcmd(grade);
      // console.log('5',foodRcmd);
      const workoutRcmd = await mypageDao.workoutRcmd(userId);
      // console.log('6',workoutRcmd);
      return {
        'userInfo': userInfo,
        'trainerInfo': trainerInfo,
        'ptOrderInfo': ptOrderInfo,
        'subOrderInfo': subOrderInfo,
        'foodRcmd': foodRcmd,
        'workoutRcmd': workoutRcmd,
      }
    }
  } catch (err) {
    console.log(err);
  }
};

// const updateMypage = async () => {};

module.exports = {
  mypage,
};
