const { trainerMatchingDao, trainerQueryBuilder } = require("../models");
const { throwError } = require("../utils/throwError");

const getTrainerProduct = async (
  userId,
  offset,
  limit,
  sort,
  kind,
  gender,
  isTrainer
) => {
  //트레이너 확인 후 구독 여부 확인
  // 구독자인지 확인
  const isSubscribed = await trainerMatchingDao.isSubscribed(userId);

  // 이미 글을 작성한 트레이너인지 확인
  const trainerId = await trainerMatchingDao.findTrainerId(userId);
  const isPostedTrainer = await trainerMatchingDao.isPostedTrainer(trainerId);

  //쿼리생성
  const sortQuery = await trainerQueryBuilder.sortQuery(sort);
  const categoryQuery = await trainerQueryBuilder.categoryQuery(kind);
  const genderQuery = await trainerQueryBuilder.genderQuery(gender);
  const trainerCheckQuery = await trainerQueryBuilder.trainerCheckQuery(
    isTrainer,
    trainerId
  );
  const offsetQuery = await trainerQueryBuilder.offsetQuery(offset, limit);

  const data = await trainerMatchingDao.getTrainerMatching(
    sortQuery,
    categoryQuery,
    genderQuery,
    trainerCheckQuery,
    offsetQuery
  );

  return {
    isSubscribed: isSubscribed,
    isPostedTrainer: isPostedTrainer,
    data: data,
  };
};

const getTrainerProductDetail = async (userId, productsId) => {
  //트레이너 확인 후 토큰 확인해서 구독 여부
  //구독여부확인 구독하지 않았으면 상세글을 볼 수 없다.
  const isSubscribed = await trainerMatchingDao.isSubscribed(userId);
  var isAuth = true;
  if (!isSubscribed) {
    throwError(400, "UNAUTHORIZED_USER");
  }
  //트레이너 일 때만 글을 삭제 작성할 수 있다.
  const isTrainer = await trainerMatchingDao.isTrainer(userId);
  if (!isTrainer) {
    isAuth = false;
  }
  // 이미 글을 작성한 트레이너인지 확인
  const trainerId = await trainerMatchingDao.findTrainerId(userId);
  const isPostedTrainer = await trainerMatchingDao.isPostedTrainer(trainerId);

  const data = await trainerMatchingDao.getTrainerMatchingDetail(productsId);
  return {
    isSubscribed: isSubscribed,
    isPostedTrainer: isPostedTrainer,
    trainerId: trainerId,
    data: data,
  };
};

const createTrainerProduct = async (
  userId,
  name,
  place,
  price,
  time,
  period,
  content
) => {
  //트레이너인지
  const isTrainer = await trainerMatchingDao.isTrainer(userId);
  if (!isTrainer) throwError(400, "INVALID_USER");
  //구독여부 확인
  const isSubscribed = await trainerMatchingDao.isSubscribed(userId);
  if (!isSubscribed) throwError(400, "UNAUTHORIZED_USER");
  //이미 글을 올린 트레이너인지
  const isPostedTrainer = await trainerMatchingDao.isPostedTrainer(userId);
  console.log("isposted: ", isPostedTrainer);
  if (!isPostedTrainer) throwError(400, "DUPLICATE_SUBMISSION");

  const trainerId = await trainerMatchingDao.findTrainerId(userId);
  const categoryName =
    await trainerMatchingDao.findSpecializedCategoryByTrainerId(trainerId);

  await trainerMatchingDao.createTrainerMatching(
    trainerId,
    userId,
    name,
    place,
    price,
    time,
    period,
    content,
    categoryName
  );
};

const deleteTrainerProduct = async (userId, productsId) => {
  //분기처리
  //삭제 권한 있는 유저인지
  const isTrainer = trainerMatchingDao.isTrainer(userId);
  if (!isTrainer) throwError(400, "INVALID_USER");
  const isSubscribed = trainerMatchingDao.isSubscribed(userId);
  if (!isSubscribed) throwError(400, "UNAUTHORIZED_USER");
  //해당 글을 작성한 트레이너인지
  const trainerId = await trainerMatchingDao.findTrainerId(userId);
  const isPostedTrainer = trainerMatchingDao.isPostedTrainer(trainerId);
  if (!isPostedTrainer) {
    throwError(401, "IS_NOT_OWNER");
  }
  await trainerMatchingDao.upadateTrainerMatching(productsId, 2);
};

module.exports = {
  getTrainerProduct,
  getTrainerProductDetail,
  createTrainerProduct,
  deleteTrainerProduct,
};
