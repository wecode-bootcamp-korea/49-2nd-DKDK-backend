const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
//const NaverStrategy = require("passport-naver").Strategy;
const { generateToken } = require("../utils/generateToken");
const { throwError } = require("../utils/throwError");
require("dotenv").config();

const { userDao } = require("../models");
const { findUserByKakaoId, updateUserImgUrl, isSubscribed, createUser } = userDao;

passport.use(
  "kakao",
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.KAKAO_RIDIRECT_URL, 
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const kakaoId = profile.id;
        const imgUrl = profile._json.properties.profile_image;

        const exUser = await findUserByKakaoId(kakaoId);

        if (exUser) {
          const userType = exUser.user_type;
          
          // 1. 상세 정보를 입력한 회원
          if (userType) {
            const userId = exUser.id;

            // JWT 토큰 생성
            const jwtToken = generateToken(userId);
            if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT")

            // 구독자인지 t/f
            const isSubscribedUser = await isSubscribed(userId);
  
            //로그인 성공시 카카오에서 받은 imgurl 업데이트
            const userImgUpdate = await updateUserImgUrl(userId, imgUrl);
            if (!userImgUpdate) throwError(400, "FAIL_TO_UPDATE_IMG_URL")

            const exUserData = {
              token: jwtToken,
              userType: userType,
              isSubscribed: isSubscribedUser
            };

            if (!exUserData) throwError(400, "FAIL_TO_GET_EX_USER")

            done(null, exUserData);
         
            // 2. 상세정보를 입력하지 않은 회원
          } else {

            // jwt 토큰 발행
            const userId = exUser.id;
            const jwtToken = generateToken(userId);
            if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT")

            const userTypeData = {
              token: jwtToken
            };

            done(null, userTypeData);
          }
          // 3. 신규 회원 가입
        } else {

          const newUser = await createUser(kakaoId, imgUrl);

          // jwt 토큰 발행
          const userId = newUser.id
          const jwtToken = generateToken(userId);
            if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT")

          const newUserData = {
           token: jwtToken
          };

          if (!newUserData) throwError(400, "FAIL_TO_GET_NEW_USER")

          done(null, newUserData);
        }

      } catch (error) {
        //console.error(error.message);
        done(error); // 로그인 실패
      }
    }
  )
);
