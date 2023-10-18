const jwt = require("jsonwebtoken")
const { checkEmptyValues, generateToken, throwError } = require("../utils");
const { userServicve } = require("../services");
const { detailUpdateUser } = userServicve;

//회원가입후 토큰,  기존유저인지, 뉴 유저인지 , 
const detailSignUp = async (req, res) => {

  const accessToken = req.headers.authorization;
  const { id } = jwt.verify(accessToken, process.env.SECRET);
  const userId = id;
  
  const {
    userType,
    imgUrl,
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
      imgUrl,
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
    if (userType === 1 || userType === 2) {
      const fieldsToCheck = userType === 2 ? [...commonFields, specialized] : commonFields;

      checkEmptyValues(...fieldsToCheck);
    } else {
      throwError(400, "INVALID_USER_TYPE");
    }

    const signUpUser = await detailUpdateUser(
      userId,
      userType,
      imgUrl,
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

   // const token = generateToken(signUpUser.userId);

    return res.status(200).json({
      message: "SIGNUP_SUCCESS",
      token: accessToken,
      data: {
        userType: signUpUser.userType,
      },
    });
  } catch (err) {
    console.error(err);
    
    return res.status(err.statusCode || 500).json({
      message: err.message || "FAIL_TO_SIGNUP",
    });
  }
};

module.exports = {
  detailSignUp,
};
