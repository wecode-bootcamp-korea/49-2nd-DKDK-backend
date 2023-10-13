const recordDao = require("../models/recordDao");
const { throwError } = require("../utils");
const { testDao } = recordDao;

const testService = async () => {};

const createRecordService = async (requestCreateRecord) => {};

const readRecordService = async (requestReadRecord) => {
  const convertToHoursAndMinutes = (decimal) => {
    const hours = Math.floor(decimal);
    const minutes = (decimal - hours) * 60;
    return `${hours}시간 ${Math.round(minutes)}분`;
  };

  const result = convertToHoursAndMinutes();
};

module.exports = {
  // test,
  createRecordService,
  readRecordService,
};
