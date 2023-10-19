const recordDao = require("../models/recordDao");
const { throwError } = require("../utils/throwError");

const readRecord = async(id) => {
  const userIdLoader = await recordDao.recordIdParamsChecker(id);
  const userIdParamsLoader = userIdLoader[0];

  if (userIdParamsLoader === undefined) {
  return userIdParamsLoader;
  }
  const readRecentRecords = await recordDao.userRecordReader(id);
  const avgTimeTotal = await recordDao.avgWorkoutTimeTotal();
  const avgTimeUser = await recordDao.avgWorkoutTimeUser((id));
  //시간을 표시합니다.

  const formattedAvgTimeTotal = Number(avgTimeTotal[0].workoutTime);
  const formattedAvgTimeUser = Number(avgTimeUser[0].workoutTime);

  const timeKrFormatter = (time) => {
    const fullHours = Math.floor(time);
    const minutes = (time - fullHours) * 60;
    const roundedMinutes = Math.round(minutes);
    const formattedTimeKr = `${fullHours}시간 ${roundedMinutes}분`;
    return formattedTimeKr;  
  }

  const avgTimeTotalKr = timeKrFormatter(formattedAvgTimeTotal);
  const avgTimeUserKr = timeKrFormatter(formattedAvgTimeUser);
  const numberCompareTime = [
    {
    avgTimeTotal: formattedAvgTimeTotal,
    avgTimeTotalKr: avgTimeTotalKr,
    "name": "전체 평균"
    },
    {
    avgTimeUser: formattedAvgTimeUser,
    avgTimeUserKr: avgTimeUserKr,
    "name": "내 평균"
    },
  ];

  //프론트가 요청한 응답형태로 포맷팅합니다.
  const numberMuscle = readRecentRecords[0].numberMuscleRecords;
  const numberWeight = readRecentRecords[0].numberWeightRecords;
  const numberFat = readRecentRecords[0].numberFatRecords;
  const numberHeartbeat = readRecentRecords[0].numberHeartbeatRecords
  const formattedRecords = {
    numberMuscleRecords: numberMuscle,
    numberWeightRecords: numberWeight,
    numberFatRecords: numberFat,
    numberHeartbeatRecords: numberHeartbeat,
    numberCompareTime, 
  };
  return formattedRecords;
}

const createRecord = async (id, addRecord) => {
  //유저아이디가 존재하는지 확인
  const userIdLoader = await recordDao.recordIdParamsChecker(id);
  if (!userIdLoader) {
    return userIdLoader;
  }

  //유저정보 확인 후, 기록 생성/업데이트 분기처리
  const nowDate = new Date();
  const userDateTime = await recordDao.recordTimeChecker(addRecord);
  const receivedDateTime = userDateTime[0].createdAt;
  const dateCheckerPole = nowDate.setHours(0, 0, 0, 0);
  const formattedUserDate = receivedDateTime.setHours(0, 0, 0, 0);

  //당일 기록 미존재 시, 기록 생성
  if (dateCheckerPole !== formattedUserDate) {
    const recordCreator = await recordDao.recordCreator(addRecord);
    return recordCreator;
  }

  //당일 기록 존재 시, 기록 업데이트
  const recordUpdater = await recordDao.recordUpdater(addRecord);
  return recordUpdater;
};

module.exports = {
  createRecord,
  readRecord,
};
