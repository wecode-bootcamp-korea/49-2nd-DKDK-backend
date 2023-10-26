const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;
const NaverStrategy = require("passport-naver").Strategy;
const { generateToken } = require("../utils/generateToken");
const { throwError } = require("../utils/throwError");
require("dotenv").config();

const { userDao } = require("../models");
const { findUserByProviderId, updateUserImgUrl, 
  isSubscribed, createUserByProviderId, } = userDao;

  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: process.env.KAKAO_ID,
        callbackURL: process.env.KAKAO_RIDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const provider = "kakao";
        const providerId = profile.id;
        const imgUrl = profile._json.properties.profile_image;
        createOrUpdateUser(provider, providerId, imgUrl, done);
      }
    )
  );
  
  passport.use(
    "naver",
    new NaverStrategy(
      {
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_RIDIRECT_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        const provider = "naver";
        const providerId = profile.id;
        const imgUrl = profile._json.profile_image;
        createOrUpdateUser(provider, providerId, imgUrl, done);
      }
    )
  );


  const createOrUpdateUser = async (provider, id, imgUrl, done) => {
    try {
      const exUser = await findUserByProviderId(provider, id);
  
      if (exUser) {
        const userType = exUser.user_type;
        const userId = exUser.id;
  
        const jwtToken = generateToken(userId);
        if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT");
  
        if (userType) {
          const isSubscribedUser = await isSubscribed(userId);
          const userImgUpdate = await updateUserImgUrl(userId, imgUrl);
          if (!userImgUpdate) throwError(400, "FAIL_TO_UPDATE_IMG_URL");
  
          const exUserData = {
            token: jwtToken,
            userType: userType,
            isSubscribed: isSubscribedUser,
          };
  
          if (!exUserData) throwError(400, "FAIL_TO_GET_EX_USER");
  
          done(null, exUserData);
        } else {
          const userTypeData = {
            token: jwtToken,
          };
  
          done(null, userTypeData);
        }
      } else {
        const newUser = await createUserByProviderId(provider, id, imgUrl);
        const userId = newUser.id;
        const jwtToken = generateToken(userId);
        if (!jwtToken) throwError(400, "FAIL_TO_GENERATE_JWT");
  
        const newUserData = {
          token: jwtToken,
        };
  
        if (!newUserData) throwError(400, "FAIL_TO_GET_NEW_USER");
  
        done(null, newUserData);
      }
    } catch (error) {
      done(error);
    }
  };
