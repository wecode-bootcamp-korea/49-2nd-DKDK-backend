
const kakaoLogin = async (req, res) => {

    if (req.user) {
  
      if (req.user.userId) {
        
        // 회원가입 응답
        const { userId, imgUrl } = req.user;
        const response = {
          message: "NEW_USER",
          statusCode: 201,
          userId,
          imgUrl,
        };
  
        res.json(response);
  
      } else if (req.user.token) {
  
        // 로그인 응답 
        const { token, userType } = req.user;
        const response = {
          message: "LOGIN_SUCCESS",
          statusCode: 200,
          token,
          userType,
          //isSubscribed 추가 예정
        };
  
        res.json(response);
  
      }
    } else {
  
      res.status(500).json({ message: "FAIL_TO_LOGIN_RETURN", statusCode: 500 });
    }
  };
  
  module.exports = {
    kakaoLogin,
  };