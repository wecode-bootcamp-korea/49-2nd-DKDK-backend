const { trainerMatchingDao, trainerQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

const getTrainerProduct = async (userId, offset, limit, sort, kind, gender) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  const isSub = true;
  if (isTrainer || isSubscribed) {
    isSub = false;
  }
  //쿼리생성
  const sortQuery = trainerQueryBuilder.sortQuery(sort);
  const categoryQuery = trainerQueryBuilder.categoryQuery(kind);
  const genderQuery = trainerQueryBuilder.genderQuery(gender);
  const trainerCheckQuery = trainerQueryBuilder.trainerCheckQuery(
    isTrainer,
    userId
  );
  const products = trainerQueryBuilder.products(offset, limit);

  const data = await trainerMatchingDao.getTrainerMatching(
    sortQuery,
    categoryQuery,
    genderQuery,
    trainerCheckQuery,
    products
  );
  return { isSubscribed: isSub, data: data };
};

module.exports = { getTrainerProduct, getSortTrainerProduct };
