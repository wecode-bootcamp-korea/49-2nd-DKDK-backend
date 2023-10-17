const { checkEmptyValues, generateToken, throwError } = require("../utils"); 
const { userServicve } = require("../services");
const {} = userServicve;

const detailSignUp = async (res, req) => {
  const {
    userType, imgUrl,nickname, phoneNumber, gender,
    birthday, height, weight, interestedWorkout, workoutLoad, specialized,
  } = req.body;

  try {

    // 키에러 체크
    if (!userType) throwError(400, "KEY_ERROR");

    const commonFields = [
      imgUrl, nickname, phoneNumber, gender, birthday,
      height, weight, interestedWorkout, workoutLoad,
    ];

    if (userType === 1 || userType === 2) {
      const fieldsToCheck = userType === 2 ? [...commonFields, specialized] : commonFields;

      checkEmptyValues(...fieldsToCheck);
    } else {
      throwError(400, "INVALID_USER_TYPE");
    }




  } catch (err) {
    console.error(err);
  }
};

module.exports = {
    detailSignUp
}