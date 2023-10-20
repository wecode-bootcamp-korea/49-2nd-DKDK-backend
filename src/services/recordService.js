const recordDao = require("../models/recordDao");
const { throwError } = require("../utils/throwError");

const readRecord = async (id) => {
  const userIdLoader = await recordDao.recordIdParamsChecker(id);
  const userIdParamsLoader = userIdLoader[0];

  if (userIdParamsLoader === undefined) {
    return userIdParamsLoader;
  }
  const readRecentRecords = await recordDao.userRecordReader(id);
  const avgTimeTotal = await recordDao.avgWorkoutTimeTotal();
  const avgTimeUser = await recordDao.avgWorkoutTimeUser(id);
  //시간을 표시합니다.

  const formattedAvgTimeTotal = Number(avgTimeTotal[0].workoutTime);
  const formattedAvgTimeUser = Number(avgTimeUser[0].workoutTime);

  const timeKrFormatter = (time) => {
    const fullHours = Math.floor(time);
    const minutes = (time - fullHours) * 60;
    const roundedMinutes = Math.round(minutes);
    const formattedTimeKr = `${fullHours}시간 ${roundedMinutes}분`;
    return formattedTimeKr;
  };

  const avgTimeTotalKr = timeKrFormatter(formattedAvgTimeTotal);
  const avgTimeUserKr = timeKrFormatter(formattedAvgTimeUser);
  const numberCompareTime = [
    {
      avgTimeTotal: formattedAvgTimeTotal,
      avgTimeTotalKr: avgTimeTotalKr,
      name: "전체 평균",
    },
    {
      avgTimeUser: formattedAvgTimeUser,
      avgTimeUserKr: avgTimeUserKr,
      name: "내 평균",
    },
  ];

  //프론트가 요청한 응답형태로 포맷팅합니다.
  const numberMuscle = readRecentRecords[0].numberMuscleRecords;
  const numberWeight = readRecentRecords[0].numberWeightRecords;
  const numberFat = readRecentRecords[0].numberFatRecords;
  const numberHeartbeat = readRecentRecords[0].numberHeartbeatRecords;
  const formattedRecords = {
    numberMuscleRecords: numberMuscle,
    numberWeightRecords: numberWeight,
    numberFatRecords: numberFat,
    numberHeartbeatRecords: numberHeartbeat,
    numberCompareTime,
  };
  return formattedRecords;
};

// const createRecord = async (id, recordData) => {
const createRecord = async (recordData) => {
  const id = recordData.userId;
  
  const userIdLoader = await recordDao.recordIdParamsChecker(Number(id));
  if (!userIdLoader) return userIdLoader;

  const userDateTime = await recordDao.recordTimeChecker(id);
  const checkTime = () => {
    const receivedDateTime = userDateTime[0].createdAt;
    const formattedUserDate = receivedDateTime.setHours(0, 0, 0, 0);
    return formattedUserDate;
  }
  const recordCheckTime = () => {
    const nowDate = new Date();
    const dateCheckerPole = nowDate.setHours(0, 0, 0, 0);
    return dateCheckerPole;
  }
  if (recordCheckTime() !== checkTime()) {
    const recordCreator = await recordDao.recordCreator(recordData);
    return recordCreator;
  }

  const recordUpdater = await recordDao.updateWorkoutRecords(recordData);
  if (!recordData.currentWeight) return recordUpdater;
  
  const userWeightUpdater = await recordDao.userWeightUpdater(recordData);
  return userWeightUpdater;
};

module.exports = {
  createRecord,
  readRecord,
};
