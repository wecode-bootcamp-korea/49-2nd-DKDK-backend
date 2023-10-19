const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { offset, limit, sort, kind, gender } = req.query;
  if (sort == undefined && kind == undefined && gender == undefined) {
    const data = await trainerMatchingService.getTrainerProduct(
      userId,
      offset,
      limit
    );
  }
  const data = await trainerMatchingService.getSortTrainerProduct(
    userId,
    offset,
    limit,
    sort,
    kind,
    gender
  );
};

module.exports = { getTrainerProduct };
