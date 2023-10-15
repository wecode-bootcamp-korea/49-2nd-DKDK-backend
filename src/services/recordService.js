const recordDao = require("../models/recordDao");
const { throwError } = require("../utils");
const {  
  testDao,
  recordCreator,
  musclemassReader,
  timeReader,
  maxHeartbeatReader,
  bodyfatReader } = recordDao;

const createRecordService = async (addRecord) => {
  console.log("service listen")
  const recordCreator = await recordDao.recordCreator(addRecord);
  return recordCreator
};

const readRecordService = async (id) => {
  const fatRecordReader = await recordDao.bodyfatReader(Number(id));
  const muscleRecordReader = await recordDao.musclemassReader(Number(id));
  const workoutTimeReader = await recordDao.timeReader(Number(id));
  const heartbeatReader = await recordDao.maxHeartbeatReader(Number(id));
  const formattedMuscleReader = muscleRecordReader[0];
  const formattedFatReader = fatRecordReader[0];
  const rawRecordReader = {
    muscleRecordReader,
    fatRecordReader,
    heartbeatReader,
    workoutTimeReader,
  }  
  const recordReader = {
    formattedMuscleReader,
    formattedFatReader
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
