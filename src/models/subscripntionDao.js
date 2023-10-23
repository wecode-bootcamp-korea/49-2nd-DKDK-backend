const { throwError } = require("../utils/throwError");
const { AppDataSource } = require("./dataSource");

const checkSubscriptionAndCreateSubOrder = async (userId, name, amount) => {
  // 유저의 가장 최근 주문 조회
  const [lastOrder] = await AppDataSource.query(
    `
        SELECT end_at
        FROM sub_orders
        WHERE user_id = ? 
        ORDER BY created_at DESC
        LIMIT 1
        `,
    [userId]
  );

  if (lastOrder) {
    // 구독이 이미 존재하고, 아직 유효한 경우
    const endDate = new Date(lastOrder.end_at);
    const currentDate = new Date();

    if (endDate > currentDate) {
      throwError(400, "SUBSCRIPTION_ALREADY_EXISTS");
    }
  }

  // 구독권 유효성
  const [result] = await AppDataSource.query(
    `
        SELECT id
        FROM subscriptions
        WHERE price = ?
        AND term = ?
        `,
    [amount, name]
  );

  if (result) {
    // 구독권이 존재하는 경우 주문 정보 생성
    const subscriptionId = result.id;
    const createdDate = new Date();
    const endDate = new Date();
    endDate.setMonth(createdDate.getMonth() + 1);

    const createSubOrder = await AppDataSource.query(
      `
        INSERT INTO sub_orders
        (user_id, sub_id, created_at, end_at)
        VALUES (?, ?, ?, ?)
     `,
      [userId, subscriptionId, createdDate, endDate]
    );

    if (!createSubOrder) {
      throwError(400, "FAIL_TO_CREATE_SUB_ORDER");
    } else {
      console.log("주문 성공");
    }
  } else {
    throwError(404, "SUBSCRIPTION_NOT_FOUND");
  }

  return !!result;
};

module.exports = {
  checkSubscriptionAndCreateSubOrder,
};