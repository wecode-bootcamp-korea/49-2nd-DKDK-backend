const { trainerMatchingDao } = require("../models");
const { throwError } = require("../utils/throwError");

const getTrainerProduct = async (userId) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  const isSubscript = trainerMatchingDao.isSubscript(userId);
  if (isTrainer || isSubscript) {
    throwError(400, "IS_NOT_SUBSCIBE");
  }
  return await trainerMatchingDao.getTrainerMatching();
};

module.exports = { getTrainerProduct };
