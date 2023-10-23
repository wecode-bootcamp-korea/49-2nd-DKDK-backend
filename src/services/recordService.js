const recordDao = require("../models/recordDao");

const readRecord = async (id) => {
  const readUserId = await recordDao.recordIdParamsChecker(id);
  const readUserIdParams = readUserId[0];
  if (readUserIdParams === undefined) return readUserIdParams;
  
  const readRecentRecords = await recordDao.userRecordReader(id);
  const avgTimeTotal = await recordDao.avgWorkoutTimeTotalReader();
  const avgTimeUser = await recordDao.avgWorkoutTimeUserReader(id);
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
      avgTimeTotal: formattedAvgTimeUser,
      avgTimeTotalKr: avgTimeUserKr,
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
const createRecord = async (id, recordData) => {
 
  const readUserId = await recordDao.recordIdParamsChecker(Number(id));
  if (!readUserId) return readUserId;

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
    const recordCreator = await recordDao.recordCreator(id, recordData);
    return recordCreator;
  }

  const recordUpdate = await recordDao.workoutRecordsUpdater(id, recordData);
  if (!recordData.currentWeight) return recordUpdate;
  
  const userWeightUpdate = await recordDao.userWeightUpdater(id, recordData);
  return userWeightUpdate;
};

module.exports = {
  createRecord,
  readRecord,
};
