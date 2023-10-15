const recordDao = require("../models/recordDao");
const { throwError } = require("../utils");
const { testDao } = recordDao;

const testService = async () => {
   const productIntroducer = await productDao.introducer(id);
      const productId = productIntroducer[0].id;
    const imageSelector = await productDao.imageLoader(id);
    const data = {
      productId,
      options: optionSelector,
    }; 
};

const createRecordService = async (requestCreateRecord) => {
};



const readWorkoutRecordService = async (requestReadRecord) => {
  const workoutRecordReader = await recordDao.introducer(requestReadRecord);
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
