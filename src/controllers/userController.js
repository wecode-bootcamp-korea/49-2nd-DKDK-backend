const jwt = require("jsonwebtoken");
const { checkEmptyValues, generateToken, throwError } = require("../utils");
const { userServicve } = require("../services");
const { detailUpdateUser, isNicknameDuplicate } = userServicve;

const updateUserInfo = async (req, res) => {
  
  const userId = req.userId;

  const {
    userType,
    nickname,
    phoneNumber,
    gender,
    birthday,
    height,
    weight,
    interestedWorkout,
    workoutLoad,
    specialized,
  } = req.body;

  try {
    // 키에러 체크
    const commonFields = [nickname, phoneNumber, gender, birthday, height, weight, interestedWorkout, workoutLoad];

    //트레이너만 specialized 입력
    const userTypes = {
      USER: "1",
      TRAINER: "2",
    };
    if (userType === userTypes.USER || userType === userTypes.TRAINER) {
      const fieldsToCheck = userType === userTypes.TRAINER ? [...commonFields, specialized] : commonFields;
      checkEmptyValues(...fieldsToCheck);
    } else {
      throwError(400, "INVALID_USER_TYPE");
    }

    const signUpUser = await detailUpdateUser(
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

    res.status(200).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    //console.error(err.message);

    res.status(err.status || 500).json({
      message: err.message || "FAIL_TO_SIGNUP",
    });
  }
};

const checkDuplicateNickname = async (req, res) => {
  try {
    const { nickname } = req.body;
    checkEmptyValues(nickname)
    const isDuplicate = await isNicknameDuplicate(nickname);

    res.status(200).json({
      message: isDuplicate, 
    });
  } catch (err) {
    //console.error(err.message);
    res.status(err.status || 500).json({
      message: err.message || "FAIL_TO_CHECK_NICKNAME",
    });
  }
};

module.exports = {
  updateUserInfo,
  checkDuplicateNickname,
};
