const recordDao = require("../models/recordDao");
const { throwError } = require("../utils");
const {  
  testDao,
  recordCreator,
  musclemassReader,
  timeReader,
  avgWorkoutTimeTotal,
  avgWorkoutTimeUser,
  maxHeartbeatReader,
  bmiReader,
  weightReader,
  recordUpdater,
  recordChecker,
  bodyfatReader } = recordDao;

const createRecordService = async (addRecord) => {
  
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed, so +1 is needed
    const day = String(today.getDate()).padStart(2, '0');
    const dateNow = `${year}-${month}-${day}`;
    return dateNow
  }

  const getFormattedDate = () => {
    const userday = Date();
    const year = String(userday.getFullYear());
    const month = String(userday.getMonth() + 1).padStart(2, '0');  // Month is 0-indexed, so +1 is needed
    const day = String(userday.getDate()).padStart(2, '0');
    const dateUser = `${year}-${month}-${day}`;
    return dateUser
  }

  
  const currentDate = getCurrentDate();
  console.log(currentDate)
  const userDate = await recordDao.recordChecker(addRecord);
  const receivedDate = userDate[0].createdDate;
  console.log(receivedDate)
  const userDateChecker = getFormattedDate(receivedDate)
  console.log(userDateChecker)
  

  if (userDateChecker !== currentDate) {
    const recordCreator = await recordDao.recordCreator(addRecord);
    return recordCreator;
  } 
    const recordUpdater = await recordDao.recordUpdater(addRecord);
    return recordUpdater;
};

const readRecordService = async (id) => {
  const fatRecordReader = await recordDao.bodyfatReader(Number(id));
  const numberFatRecords = fatRecordReader.map(record => {
    const numberFat = Number(record.bodyFat)
    return {
      bodyFat: numberFat,
      createdDate: record.createdDate
    };
  });
  
  const muscleRecordReader = await recordDao.musclemassReader(Number(id));
  const numberMuscleRecords = muscleRecordReader.map(record => {
    const numberMuscleMass = Number(record.muscleMass)
    return {
      muscleMass: numberMuscleMass,
      createdDate: record.createdDate
    };
  });
  
  const workoutTimeReader = await recordDao.timeReader(Number(id));
  const numberWorkoutTimeRecords = workoutTimeReader.map(record => {
    const numberWorkout = Number(record.workoutTime)
    return {
      workoutTime: numberWorkout,
      createdDate: record.createdDate
    };
  });
  
  const heartbeatReader = await recordDao.maxHeartbeatReader(Number(id));
  const numberHeartbeatRecords = heartbeatReader.map(record => {
    const numberHeartbeat = Number(record.maxHeartrate)
    return {
      maxHeartbeat: numberHeartbeat,
      createdDate: record.createdDate
    };
  });

  const bmiRecordReader = await recordDao.bmiReader(Number(id));
  const numberBmiRecords = bmiRecordReader.map(record => {
    const weightSquared = parseFloat(record.weight) * parseFloat(record.weight);
    const bmi = weightSquared / parseFloat(record.height);
    return {
      bmi: Number(bmi.toFixed(2)), // 결과를 소수점 둘째 자리까지만 반환
      createdDate: record.createdDate
    };
  });

  const avgTimeTotal = await recordDao.avgWorkoutTimeTotal();
    const avgTimeUser = await recordDao.avgWorkoutTimeUser(Number(id));
    const formattedAvgTimeTotal = Number(avgTimeTotal[0].workoutTime);
    const formattedAvgTimeUser = Number(avgTimeUser[0].workoutTime);
    const numberCompareTime = {
    avgTimeTotal: formattedAvgTimeTotal,
    avgTimeUser: formattedAvgTimeUser
  }

  const weightRecordReader = await recordDao.weightReader(Number(id));

  const rawRecordReader = {
    numberMuscleRecords,
    numberBmiRecords,
    numberFatRecords ,
    numberHeartbeatRecords,
    numberWorkoutTimeRecords,
    numberCompareTime,
  }  

  return rawRecordReader;
};

const testService = async (id) => {
  console.log("HELLO FROM THE SERVICE");
  const testReader = await recordDao.testDao(Number(id));
  return testReader
};

module.exports = {
  createRecordService,
  readRecordService,
  testService,
};
