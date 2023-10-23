const { throwError } = require("../utils/throwError");
const { subscripntionDao } = require("../models")
const { checkSubscriptionAndCreateSubOrder } = subscripntionDao;

const checksubscriptionValidity = async (userId, name, amount) => {

    //데이터베이스에 저장되어 있는 구독권 이름인지
    if (name.includes("DKDK 커뮤니티 1개월 구독권")) {
        name = 1;
    } else {
        throwError(400, "INVALID_NAME")
    }

    // userType = 1 이면 만원, 2면 2만원 결제하는 거 맞는지 확인
    
       //유효한 구독권인지 확인
       const issubscriptionValid = await checkSubscriptionAndCreateSubOrder(userId, name, amount);
       return issubscriptionValid;
}

module.exports = {
    checksubscriptionValidity,

}