const jwt = require("jsonwebtoken")
const { checkEmptyValues, generateToken, throwError } = require("../utils");
const { userServicve } = require("../services");
const { detailUpdateUser } = userServicve;

const updateUserInfo = async (req, res) => {

  const accessToken = req.headers.authorization;
  if(!accessToken) throwError("INVALID_TOKEN")

  const { id } = jwt.verify(accessToken, process.env.SECRET);
  const userId = id;

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
    if (!userType) throwError(400, "KEY_ERROR");

    const commonFields = [
      nickname,
      phoneNumber,
      gender,
      birthday,
      height,
      weight,
      interestedWorkout,
      workoutLoad,
    ];

    //트레이너만 specialized 입력
    const userTypes = {
      USER : 1,
      TRAINER : 2
    }
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

    console.log("userController signUpUser : ", signUpUser)

    return res.status(200).json({
      message: "SIGNUP_SUCCESS",
    });
  } catch (err) {
    console.error(err);
    
    return res.status(err.statusCode || 500).json({
      message: err.message || "FAIL_TO_SIGNUP",
    });
  }
};

module.exports = {
  updateUserInfo,
};
