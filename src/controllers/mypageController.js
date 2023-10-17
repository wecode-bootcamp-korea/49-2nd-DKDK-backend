const { throwError } = require("../utils/throwError");
const { mypageService } = require("../services");

const mypageView = async (req, res, next) => {
  try {
    const { userId, grade } = req.query;
    if (!userId) throwError(400, "KeyError: ID");
    if (!grade) throwError(400, "KeyError: grade");
    return res.status(200).json({
      message: "MYPAGE_LOADED",
      data: await mypageService.mypage(userId, grade),
    });
  } catch (err) {
    throwError(400, "WTF ARE YOU THINKING?");
    console.error(err);
    next(err);
  }
};

module.exports = {
  mypageView,
};
