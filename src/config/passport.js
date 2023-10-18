const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const { generateToken, throwError } = require("../utils");
require("dotenv").config();

const { userDao } = require("../models");
const { findByKakaoId, updateImgUrl, createUser } = userDao;

// 카카오 전략
passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: "http://localhost:8000/auth/kakao/callback", //"http://localhost:3000/login/kakao", //"https://getpostman.com/oauth2/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const kakaoId = profile.id;
        const imgUrl = profile._json.properties.profile_image;
        console.log("passport kakaoId : ", kakaoId);
        console.log("passport imgUrl : ", imgUrl);

        const exUser = await findByKakaoId(kakaoId);

        if (exUser) {
          const userType = exUser.user_type;
          console.log("passport login userType : ", userType);

          if (userType) {
            const userId = exUser.id;
            // JWT 토큰 생성
            const jwtToken = generateToken(userId);

            if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT")
             
            //로그인 성공시 카카오에서 받은 imgurl 업데이트
            const userImgUpdate = await updateImgUrl(userId, imgUrl);

            if (!userImgUpdate) throwError(400, "FAIL_TO_UPDATE_IMG_URL")

            const exUserData = {
              token: jwtToken,
              userType: exUser.userType,
              // isSubscribed: exUser.isSubscribed, 추후 구현
            };

            if (!exUserData) throwError(400, "FAIL_TO_GET_EX_USER")

            done(null, exUserData); //req.user 라는 객체가 생성, null은 오류객체자리
         
          } else {
            const userTypeData = {
              userId: exUser.id,
              imgUrl: exUser.imgUrl,
            };
            done(null, userTypeData);
          }
        } else {
          //회원가입
          const newUser = await createUser(kakaoId, imgUrl);
          console.log("passport signup newUser : ", newUser);

          const newUserData = {
            userId: newUser.id,
            imgUrl: newUser.img_url,
          };

          if (!newUserData) throwError(400, "FAIL_TO_GET_NEW_USER")

          done(null, newUserData);
        }
      } catch (error) {
        console.error(error);
        done(error); // 로그인 실패
      }
    }
  )
);
