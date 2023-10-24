const trainerMatchingDao = require("./trainerMatchingDao");
const userDao = require("./userDao");
const userHealthInfoDao = require("./userHealthInfoDao");
const recordDao = require("./recordDao");
const trainerQueryBuilder = require("./trainerQueryBuilder");

module.exports = {
  userDao,
  userHealthInfoDao,
  recordDao,
  trainerMatchingDao,
  trainerQueryBuilder,
};
