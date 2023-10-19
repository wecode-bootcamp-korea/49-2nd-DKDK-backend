const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const data = await trainerMatchingService.getTrainerProduct(userId);
};

module.exports = { getTrainerProduct };
