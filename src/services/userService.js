const { throwError } = require("../utils");
const { userDao } = require("../models");
const { findByUserId, findUserByNickname, updateUser } = userDao;

const detailUpdateUser = async (
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

    // 회원 가입 여부 확인 -> 추후 생략
    const isUser = await findByUserId(userId);
    if (!isUser) throwError(400, "INVAILD_USER");

    //폰번호 유효성 검사 : 01048854885
    const phoneNumberRegex = /^01[016-9]\d{3,4}\d{4}$/;
    if (!phoneNumberRegex.test(phoneNumber)) throwError(400, "INVAILD_PHONE_NUMBER");

    //키,몸무게 유효성 검사 : 0 이상
    if (height <= 0 || weight <= 0) throwError(400, "INVAILD_NUMERIC");

    const result = await updateUser(
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
    );
    
    return result;
};

const isNicknameDuplicate = async (nickname) => {
  const isNicknameTaken = await findUserByNickname(nickname)
  
  if (!isNicknameTaken) {
    return "AVAILABLE_NICKNAME"
  } else {
    return "DUPLICATE_NICKNAME"
  }
}

module.exports = {
  detailUpdateUser,
  isNicknameDuplicate
};