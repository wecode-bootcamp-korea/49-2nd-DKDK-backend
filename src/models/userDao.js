const { AppDataSource } = require("../models/dataSource");
const { createConnection } = require("typeorm");
const { throwError } = require("../utils");

// isSubscribed 추가
const findUserByKakaoId = async (kakaoId) => {
  const [result] = await AppDataSource.query(
    `
        SELECT id, user_type
        FROM users
        WHERE kakao_id = ?
        `,
    [kakaoId]
  );

  return result;

};

const updateUserImgUrl = async (userId, imgUrl) => {
  const result = await AppDataSource.query(
    `
      UPDATE users 
      SET img_url = ?
      WHERE id = ?
    `,
    [imgUrl, userId]
  );

  return result;
};

const createUser = async (kakaoId, imgUrl) => {
  const result = await AppDataSource.query(
    `
    INSERT INTO users 
    (kakao_id, img_url) 
    VALUES (?, ?)
    `,
    [kakaoId, imgUrl]
  );
  if (result.insertId) {
    
    return {
      id: result.insertId,
    };

  } else {
    throwError(401, "FAIL_TO_CREATE_USER")
  }

};

const isSubscribed = async (userId) => {
  const [result] = await AppDataSource.query(
    `
      SELECT id
      FROM sub_orders
      WHERE user_id = ?
      AND end_at > NOW()
    `,
    [userId]
  )

  return !!result;
}

const findByUserId = async (userId) => {
  const [result] = await AppDataSource.query(
    `
    SELECT id
    FROM users
    WHERE id = ?
    `,
    [userId]
  );

  return result;
};


// 상세 업데이트
const updateUser = async (
  userId,
  userType,
  nickname,
  phoneNumber,
  gender,
  birthday,
  height,
  weight,
  interestedWorkout,
  workoutLoad,
  specialized
) => {
  const connection = await createConnection();

  try {
    //트랜젝션 시작
    const result = await connection.transaction(async (transactionalEntityManager) => {
      //1. 유저 정보 업데이트
      const userUpdate = await transactionalEntityManager.query(
        `
            UPDATE users
            SET 
                user_type = ?,
                nickname = ?,
                phone_number = ?,
                gender = ?,
                birthday = ?,
                height = ?,
                weight = ?,
                interested_workout = ?,
                workout_load =?
            WHERE id = ?
          `,
        [
          userType,
          nickname,
          phoneNumber,
          gender,
          birthday,
          height,
          weight,
          interestedWorkout,
          workoutLoad,
          userId,
        ]

      );

      //2. 트레이너 회원의 경우 트레이너 정보 생성
      const userTypes = {
        USER : 1,
        TRAINER : 2
      }
      if (userType === userTypes.TRAINER) {
        const createTrainer = await transactionalEntityManager.query(
          `
            INSERT INTO trainers
            (user_id, specialized)
            VALUES (?, ?)
          `,
          [userId, specialized]
        );
      }
      
      if (userUpdate.affectedRows > 0) {
         
       return {
          userId : userId,
          userType : userType,
        }
        
      } else {
        throwError(401, "FAIL_TO_UPDATE_USER");
      }
    });
    return result;

  } catch (err) {
    //롤백 및 에러 처리
    console.error(err);
    throwError(400, "TRANSACTION_ERROR");
  } finally {
    //연결 닫기
    await connection.close();
  }
};

module.exports = {
  findUserByKakaoId,
  findByUserId,
  isSubscribed,
  updateUserImgUrl,
  createUser,
  updateUser,
};
