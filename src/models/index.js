const {
  recordTimeChecker,
  recordIdChecker,
  recordCreator,
  updateWorkoutRecords,
  weightReader,
  avgWorkoutTimeTotal,
  avgWorkoutTimeUser,
  timeReader,
  bmiReader,
  maxHeartbeatReader,
  recordIdParamsChecker,
  musclemassReader,
  bodyfatReader,
} = require("./recordDao");
const userHealthInfoDao = require("./userHealthInfoDao");

module.exports = {
  userHealthInfoDao,
};
