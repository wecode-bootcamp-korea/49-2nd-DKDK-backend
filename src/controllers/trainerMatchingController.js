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

const postTrainerProduct = async (req, res) => {
  const userId = req.userId;

  await trainerMatchingService.postTrainerProduct(userId);
};

module.exports = { getTrainerProduct, postTrainerProduct };
