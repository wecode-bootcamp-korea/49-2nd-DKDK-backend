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
  bodyfatReader,
} = recordDao;

const createRecordService = async (addRecord) => {
  try {
    const nowDate = new Date();
    const userDateTime = await recordDao.recordChecker(addRecord);
    const receivedDateTime = userDateTime[0].createdDate; 
    const dateCheckerPole = nowDate.setHours(0, 0, 0, 0); 
    const formattedUserDate = receivedDateTime.setHours(0,0,0,0)
  
    // if (dateCheckerPole !== formattedUserDate) {
    //   const recordCreator = await recordDao.recordCreator(addRecord);
    //   return recordCreator;
    // }

    if (dateCheckerPole !== formattedUserDate) {
      const recordCreator = await recordDao.recordCreator(addRecord);
      return recordCreator;
    }
      const recordUpdater = await recordDao.recordUpdater(addRecord);
      return recordUpdater;
    
  };
} catch (error) {
  console.log(error);
}
  

const readRecordService = async (id) => {
  const fatRecordReader = await recordDao.bodyfatReader(Number(id));
  const numberFatRecords = fatRecordReader.map((record) => {
    const numberFat = Number(record.bodyFat);
    return {
      bodyFat: numberFat,
      createdDate: record.createdDate,
    };
  });

  const muscleRecordReader = await recordDao.musclemassReader(Number(id));
  const numberMuscleRecords = muscleRecordReader.map((record) => {
    const numberMuscleMass = Number(record.muscleMass);
    return {
      muscleMass: numberMuscleMass,
      createdDate: record.createdDate,
    };
  });

  const workoutTimeReader = await recordDao.timeReader(Number(id));
  const numberWorkoutTimeRecords = workoutTimeReader.map((record) => {
    const numberWorkout = Number(record.workoutTime);
    return {
      workoutTime: numberWorkout,
      createdDate: record.createdDate,
    };
  });

  const heartbeatReader = await recordDao.maxHeartbeatReader(Number(id));
  const numberHeartbeatRecords = heartbeatReader.map((record) => {
    const numberHeartbeat = Number(record.maxHeartrate);
    return {
      maxHeartbeat: numberHeartbeat,
      createdDate: record.createdDate,
    };
  });

  const bmiRecordReader = await recordDao.bmiReader(Number(id));
  const numberBmiRecords = bmiRecordReader.map((record) => {
    const weightSquared = parseFloat(record.weight) * parseFloat(record.weight);
    const bmi = weightSquared / parseFloat(record.height);
    return {
      bmi: Number(bmi.toFixed(2)), // 결과를 소수점 둘째 자리까지만 반환
      createdDate: record.createdDate,
    };
  });

  const avgTimeTotal = await recordDao.avgWorkoutTimeTotal();
  const avgTimeUser = await recordDao.avgWorkoutTimeUser(Number(id));
  const formattedAvgTimeTotal = Number(avgTimeTotal[0].workoutTime);
  const formattedAvgTimeUser = Number(avgTimeUser[0].workoutTime);
  const numberCompareTime = {
    avgTimeTotal: formattedAvgTimeTotal,
    avgTimeUser: formattedAvgTimeUser,
  };

  const weightRecordReader = await recordDao.weightReader(Number(id));

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

const testService = async (id) => {
  console.log("HELLO FROM THE SERVICE");
  const testReader = await recordDao.testDao(Number(id));
  return testReader;
};

module.exports = {
  createRecordService,
  readRecordService,
  testService,
};
