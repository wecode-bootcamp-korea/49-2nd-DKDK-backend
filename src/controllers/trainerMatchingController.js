const { trainerMatchingService } = require("../services");

const getTrainerProduct = async (req, res) => {
  const userId = req.userId;
  const { offset, limit, sort, kind, gender } = req.query;
  //   if (sort == undefined && kind == undefined && gender == undefined) {
  //     const data = await trainerMatchingService.getTrainerProduct(
  //       userId,
  //       offset,
  //       limit
  //     );
  //   }
  // 아래의 파일로 바로 실행하기
  const data = await trainerMatchingService.getTrainerProduct(
    userId,
    offset,
    limit,
    sort,
    kind,
    gender
  );
};

module.exports = { getTrainerProduct };
