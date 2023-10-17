const { AppDataSource } = require("../models/dataSource");

const findByKakaoId = async (kakaoId) => {
  const [result] = await AppDataSource.query(
    `
        SELECT id, user_type
        FROM users
        WHERE kakao_id = ?
        `,
    [kakaoId]
  );

  console.log("userDao findByKakaoId result: ", result);

  return result;
};

const updateImgUrl = async (userId, imgUrl) => {
  const [result] = await AppDataSource.query(
    `
      UPDATE users 
      SET img_url = ?
      WHERE id = ?
    `,
    [imgUrl, userId]
  )

  return result;
}

//추후수정 : isSubscribed 추가, 트랜젝션
const createUser = async (kakaoId, imgUrl) => {
  const result = await AppDataSource.query(`INSERT INTO users (kakao_id, img_url) VALUES (?, ?)`, [kakaoId, imgUrl]);

  console.log("userDao createUser result : ", result);

  return result;
};

module.exports = {
  findByKakaoId,
  updateImgUrl,
  createUser,
};