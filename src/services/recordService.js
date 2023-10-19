const recordDao = require("../models/recordDao");
const { throwError } = require("../utils/throwError");
const {
  recordCreator,
  musclemassReader,
  timeReader,
  avgWorkoutTimeTotal,
  avgWorkoutTimeUser,
  maxHeartbeatReader,
  bmiReader,
  weightReader,
  recordUpdater,
  recordTimeChecker,
  recordIdParamsChecker,
  recordIdChecker,
  bodyfatReader,
  userRecordReader
} = recordDao;

const readRecordService2 = async(id) => {
  const readRecentRecords = await recordDao.userRecordReader(id);
  console.log(readRecentRecords)
  return readRecentRecords;
}

const createRecordService = async (addRecord) => {
  //유저아이디가 존재하는지 확인
  const userIdLoader = await recordDao.recordIdChecker(addRecord);
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

const readRecordService = async (id) => {
  const userIdLoader = await recordDao.recordIdParamsChecker(id);
  const userIdParamsLoader = userIdLoader[0];
  if (!userIdParamsLoader) {
  return userIdParamsLoader;
  }
  const fatRecordReader = await recordDao.bodyfatReader(id);
  const numberFatRecords = fatRecordReader.map((record) => {
    const rawDate = record.createdAt;
    const formattedDate = rawDate.toISOString().split('T')[0];
    const numberFat = Number(record.bodyFat);
    return {
      bodyFat: numberFat,
      createdAt: formattedDate,
    };
  });

  const muscleRecordReader = await recordDao.musclemassReader(id);
  const numberMuscleRecords = muscleRecordReader.map((record) => {
    const rawDate = record.createdAt;
    const formattedDate = rawDate.toISOString().split('T')[0];
    const numberMuscleMass = Number(record.muscleMass);
    return {
      muscleMass: numberMuscleMass,
      createdAt: formattedDate,
    };
  });

  const workoutTimeReader = await recordDao.timeReader(id);
  const numberWorkoutTimeRecords = workoutTimeReader.map((record) => {
    const rawDate = record.createdAt;
    const formattedDate = rawDate.toISOString().split('T')[0];
    const numberWorkout = Number(record.workoutTime);
    //국문으로 시간을 변환하여 표시합니다.
    const fullHours = Math.floor(numberWorkout);
    const minutes = (numberWorkout - fullHours) * 60;
    const roundedMinutes = Math.round(minutes);
    const workoutTimeKr = `${fullHours}시간 ${roundedMinutes}분`;
    return {
      workoutTime: numberWorkout,
      workoutTimeKr: workoutTimeKr,
      createdAt: formattedDate,
    };
  });

  const heartbeatReader = await recordDao.maxHeartbeatReader((id));
  const numberHeartbeatRecords = heartbeatReader.map((record) => {
    const rawDate = record.createdAt;
    const formattedDate = rawDate.toISOString().split('T')[0];
    const numberHeartbeat = Number(record.maxHeartrate);
    return {
      maxHeartbeat: numberHeartbeat,
      createdAt: formattedDate,
    };
  });

  const bmiRecordReader = await recordDao.bmiReader((id));
  const numberBmiRecords = bmiRecordReader.map((record) => {
    const rawDate = record.createdAt;
    const formattedDate = rawDate.toISOString().split('T')[0];
    const weightSquared = parseFloat(record.weight) * parseFloat(record.weight);
    const bmi = weightSquared / parseFloat(record.height);
    return {
      bmi: Number(bmi.toFixed(2)), // 결과를 소수점 둘째 자리까지만 반환
      createdAt: formattedDate,
    };
  });

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
  const numberCompareTime = {
    avgTimeTotal: formattedAvgTimeTotal,
    avgTimeTotalKr: avgTimeTotalKr,
    avgTimeUser: formattedAvgTimeUser,
    avgTimeUserKr: avgTimeUserKr,
  };

  const rawRecordReader = {
    numberMuscleRecords,
    numberBmiRecords,
    numberFatRecords,
    numberHeartbeatRecords,
    numberWorkoutTimeRecords,
    numberCompareTime,
  };
  return rawRecordReader;
};

module.exports = {
  createRecordService,
  readRecordService,
  readRecordService2,
};
