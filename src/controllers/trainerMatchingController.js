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
  //img, 이름은 해당 트레이너 정보 불러오는 거고, 지역 문자로 입력,
  // 가격 숫자로 입력, 가능시간, 문자로 입력, 1/3/6개월 선택해서 보내드려요
  // 그리고 사진 등록, text 입력해서 내용 들어갑니다!
  // 추가 하나 더ㅠ 가능한 시간 문자로 입력해서 들어가요
  const { imgUrl, name, availableArea, price, availableTime, term, content } =
    req.body;
  await trainerMatchingService.postTrainerProduct(
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
  const { productsId } = req.body;
  await trainerMatchingService.deleteTrainerProduct(userId, productsId);
  res.status(200), json({ message: "DELETE_SUCCESS" });
};

module.exports = {
  getTrainerProduct,
  postTrainerProduct,
  deleteTrainerProduct,
};
