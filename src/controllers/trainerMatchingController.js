const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { offset, limit, sort, kind, gender } = req.query;

  return await trainerMatchingService.getTrainerProduct(
    userId,
    offset,
    limit,
    sort,
    kind,
    gender
  );
};

module.exports = { getTrainerProduct };
