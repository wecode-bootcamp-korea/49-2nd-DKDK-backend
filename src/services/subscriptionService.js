const { throwError } = require("../utils/throwError");
const { subscripntionDao } = require("../models");
const { checkSubscriptionAndCreateSubOrder } = subscripntionDao;
const { userDao } = require("../models");
const { findByUserId } = userDao;

const checksubscriptionValidity = async (userId, name, amount) => {
      // 데이터베이스에 저장되어 있는 구독권 이름인지
    if (name.includes("DKDK 커뮤니티 1개월 구독권")) {
      name = 1;
    } else {
      throwError(400, "INVALID_NAME");
     }

      // userType에 해당하는 금액이 맞는지
      const result = await findByUserId(userId)
      console.log("user_type : ", result.user_type)
      const findUserType = result.user_type;

      const userTypes = {
        USER: "1",
        TRAINER: "2",
      };

      if (findUserType == userTypes.USER && amount !== 10000) {
        throwError(400, "INVALID_AMOUNT");
    } else if (findUserType == userTypes.TRAINER && amount !== 20000) {
        throwError(400, "INVALID_AMOUNT");
    }

      //유효한 구독권인지 확인
     const issubscriptionValid = await checkSubscriptionAndCreateSubOrder(userId, name, amount);
     return issubscriptionValid;
    };

    module.exports = {
     checksubscriptionValidity,
    };
