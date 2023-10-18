
const kakaoLogin = async (req, res) => {

    if (req.user) {
  
      if (!req.user.userType) {
        
        // 회원가입 응답
        const { token, userId, imgUrl  } = req.user;
        const response = {
          message: "NEW_USER",
          statusCode: 201,
          token : token,
         // userId,
         // imgUrl,
        };
  
        console.log("response : ", response)
        res.json(response);
  
      } else if (req.user.userType) {
  
        // 로그인 응답 
        const { token, userType } = req.user;
        const response = {
          message: "LOGIN_SUCCESS",
          statusCode: 200,
          token,
          userType,
          //isSubscribed 추가 예정
        };
  
        console.log("response : ", response)
        res.json(response);
  
      }
    } else {
      return res.status(500).json({
        message: "FAIL_TO_SIGN_UP",
      });
    }
  };
  
  module.exports = {
    kakaoLogin,
  };