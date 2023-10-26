const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { offset, limit, sort, category, gender, isTrainer } = req.query;
  const data = await trainerMatchingService.getTrainerProduct(
    userId,
    offset,
    limit,
    sort,
    category,
    gender,
    isTrainer
  );
  res.status(200).json({ message: "GET_SUCCESS", data: data });
};

const getTrainerProductDetail = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.query;

  const data = await trainerMatchingService.getTrainerProductDetail(
    userId,
    productId
  );
  res.status(200).json({ message: "GET_SUCCESS", data: data });
};

const createTrainerProduct = async (req, res) => {
  const userId = req.userId;
  // const userId = 5;
  const { imgUrl, name, place, price, time, period, content } = req.body;
  await trainerMatchingService.createTrainerProduct(
    userId,
    name,
    place,
    price,
    time,
    period,
    content
  );
  res.status(200).json({ message: "POST_SUCCESS" });
};

const deleteTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  await trainerMatchingService.deleteTrainerProduct(userId, productId);
  res.status(200).json({ message: "DELETE_SUCCESS" });
};

module.exports = {
  getTrainerProduct,
  getTrainerProductDetail,
  createTrainerProduct,
  deleteTrainerProduct,
};
