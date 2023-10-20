const { trainerMatchingDao } = require("../models");
const { throwError } = require("../utils/throwError");

const getTrainerProduct = async (userId, offset, limit) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  const isSub = true;
  if (isTrainer || isSubscribed) {
    isSub = false;
  }
  const data = await trainerMatchingDao.getTrainerMatching(offset, limit);
  return { isSubscribed: isSub, data: data };
};

const getSortTrainerProduct = async (
  userId,
  offset,
  limit,
  sort,
  kind,
  gender
) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  const isSub = true;
  if (isTrainer || isSubscribed) {
    isSub = false;
  }
  //쿼리 빌더 필요
  // 기능 구현 중
  const data = await trainerMatchingDao.sortTrainerMatching(
    offset,
    limit,
    sort,
    kind,
    gender
  );
  return { isSubscribed: isSub, data: data };
};

module.exports = { getTrainerProduct, getSortTrainerProduct };
