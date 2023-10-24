const { trainerMatchingDao, trainerQueryBuilder } = require("../models");
const { products, offsetQuery } = require("../models/trainerQueryBuilder");
const { throwError } = require("../utils/throwError");

const getTrainerProduct = async (userId, offset, limit, sort, kind, gender) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = await trainerMatchingDao.isTrainer(userId);
  const isSubscribed = await trainerMatchingDao.isSubscribed(userId);

  var isAuth = true;
  if (isTrainer || isSubscribed) {
    isAuth = false;
  }
  //쿼리생성
  const sortQuery = trainerQueryBuilder.sortQuery(sort);
  const categoryQuery = trainerQueryBuilder.categoryQuery(kind);
  const genderQuery = trainerQueryBuilder.genderQuery(gender);
  const trainerCheckQuery = trainerQueryBuilder.trainerCheckQuery(
    isTrainer,
    userId
  );
  const offsetQuery = trainerQueryBuilder.offsetQuery(offset, limit);

  const data = await trainerMatchingDao.getTrainerMatching(
    sortQuery,
    categoryQuery,
    genderQuery,
    trainerCheckQuery,
    offsetQuery
  );
  return { isAuth: isAuth, isSubscribed: isSubscribed, data: data };
};

const getTrainerProductDetail = async (userId, productsId) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  const isTrainer = await trainerMatchingDao.isTrainer(userId);
  const isSubscribed = await trainerMatchingDao.isSubscribed(userId);
  if (isSubscribed) {
    throwError(400, "UNAUTHORIZED_USER");
  }
  var isAuth = true;
  if (isTrainer || isSubscribed) {
    isAuth = false;
  }
  const data = await trainerMatchingDao.getTrainerMatchingDetail(productsId);
  return { isAuth: isAuth, isSubscribed: isSubscribed, data: data };
};

const createTrainerProduct = async (userId) => {
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  if (isTrainer) throwError(400, "INVALID_USER");
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  if (isSubscribed) throwError(400, "UNAUTHORIZED_USER");

  const trainerId = trainerMatchingDao.findCategoryName(userId);
  const categoryName = trainerMatchingDao.findCategoryName(trainerId);
  await trainerMatchingDao.createTrainerMatching(
    userId,
    trainerId,
    imgUrl,
    availableArea,
    price,
    availableTime,
    term,
    content,
    categoryName
  );
};

const deleteTrainerProduct = async (userId, productsId) => {
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  if (isTrainer || isSubscribed) {
    throwError(400, "UNAUTHORIZED_USER");
  }
  const isPostedTrainer = trainerMatchingDao.isPostedTrainer(
    userId,
    productsId
  );
  if (isPostedTrainer) {
    throwError(401, "IS_NOT_OWNER");
  }
  await trainerMatchingDao.deleteTrainerMatching(products, 2);
};

module.exports = {
  getTrainerProduct,
  getTrainerProductDetail,
  createTrainerProduct,
  deleteTrainerProduct,
};
