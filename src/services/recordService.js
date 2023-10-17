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
} = recordDao;

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
  console.log("userIdParamsLoader: ", userIdParamsLoader);
  if (!userIdParamsLoader) {
    throwError(404, "user not found");
  }
  const fatRecordReader = await recordDao.bodyfatReader(id);
  const numberFatRecords = fatRecordReader.map((record) => {
    const numberFat = Number(record.bodyFat);
    return {
      bodyFat: numberFat,
      createdAt: record.createdAt,
    };
  });

  const muscleRecordReader = await recordDao.musclemassReader(id);
  const numberMuscleRecords = muscleRecordReader.map((record) => {
    const numberMuscleMass = Number(record.muscleMass);
    return {
      muscleMass: numberMuscleMass,
      createdAt: record.createdAt,
    };
  });

  const workoutTimeReader = await recordDao.timeReader(id);
  const numberWorkoutTimeRecords = workoutTimeReader.map((record) => {
    const numberWorkout = Number(record.workoutTime);
    return {
      workoutTime: numberWorkout,
      createdAt: record.createdAt,
    };
  });

  const heartbeatReader = await recordDao.maxHeartbeatReader((id));
  const numberHeartbeatRecords = heartbeatReader.map((record) => {
    const numberHeartbeat = Number(record.maxHeartrate);
    return {
      maxHeartbeat: numberHeartbeat,
      createdAt: record.createdAt,
    };
  });

  const bmiRecordReader = await recordDao.bmiReader((id));
  const numberBmiRecords = bmiRecordReader.map((record) => {
    const weightSquared = parseFloat(record.weight) * parseFloat(record.weight);
    const bmi = weightSquared / parseFloat(record.height);
    return {
      bmi: Number(bmi.toFixed(2)), // 결과를 소수점 둘째 자리까지만 반환
      createdAt: record.createdAt,
    };
  });

  const avgTimeTotal = await recordDao.avgWorkoutTimeTotal();
  const avgTimeUser = await recordDao.avgWorkoutTimeUser((id));
  const formattedAvgTimeTotal = Number(avgTimeTotal[0].workoutTime);
  const formattedAvgTimeUser = Number(avgTimeUser[0].workoutTime);
  const numberCompareTime = {
    avgTimeTotal: formattedAvgTimeTotal,
    avgTimeUser: formattedAvgTimeUser,
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
};
