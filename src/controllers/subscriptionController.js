const axios = require("axios");
const { checkEmptyValues } = require("../utils/checkEmptyValues");
const { throwError } = require("../utils/throwError");
require("dotenv").config();
const { subscriptionService } = require("../services")
const { checksubscriptionValidity } = subscriptionService;

const subscriptionPayment = async (req, res) => {

    const userId = req.userId;
    const { imp_uid } = req.body;
    checkEmptyValues(imp_uid, userId)

    const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "POST",
        headers: { "Content-Type" : "application/json"},
        data: { 
            imp_key: process.env.IMP_KEY,
            imp_secret: process.env.IMP_SECRET
        }
    });
    
    const { access_token } = getToken.data.response;
    if(!access_token) throwError(400, "FAIL_TO_GET_TOKEN")

    // access_token과 프런트에서 받은 imp_uip로 결제 응답 받기
    const getPaymentResponse = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`,
        method : "GET",
        headers:{ "Authorization": access_token }
    })
    
    //응답값에서 name과 amount 
    const { amount, name } = getPaymentResponse.data.response;
    if(!amount && !name) throwError(400, "FAIL_TO_GET_PAYMENT_RESPONSE")

    // 유효한 구독 정보라면 주문 정보 생성
    const issubscriptionValid = await checksubscriptionValidity(userId, name, amount);

    if (issubscriptionValid) {
        res.status(200).json({ message: "PAYMENT_SUCCESS" });
    } else {
        console.error();
        res.status(400).json({ message: error.message});
    }
}

module.exports = { 
    subscriptionPayment, 
}