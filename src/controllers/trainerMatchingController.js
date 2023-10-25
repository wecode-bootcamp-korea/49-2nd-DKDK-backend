const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { offset, limit, sort, kind, gender } = req.query;

  const data = await trainerMatchingService.getTrainerProduct(
    userId,
    offset,
    limit,
    sort,
    kind,
    gender
  );
  res.status(200).json({ message: "GET_SUCCESS", data: data });
};

const getTrainerProductDetail = async (req, res) => {
  const { productsId } = req.body;
  const data = await trainerMatchingService.getTrainerProductDetail(productsId);
  res.status(200).json({ message: "GET_SUCCESS", data: data });
};

const createTrainerProduct = async (req, res) => {
  // const userId = req.userId;
  const userId = 5;
  const { imgUrl, name, availableArea, price, availableTime, term, content } =
    req.body;
  await trainerMatchingService.createTrainerProduct(
    userId,
    imgUrl,
    name,
    availableArea,
    price,
    availableTime,
    term,
    content
  );
  res.status(200).json({ message: "POST_SUCCESS" });
};

const deleteTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { productsId } = req.query;
  await trainerMatchingService.deleteTrainerProduct(userId, productsId);
  res.status(200), json({ message: "DELETE_SUCCESS" });
};

module.exports = {
  getTrainerProduct,
  getTrainerProductDetail,
  createTrainerProduct,
  deleteTrainerProduct,
};
