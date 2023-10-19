const { userHealthInfoService } = require("../services");

const viewUserHealthInfo = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    }
    return res.status(200).json({
      message: "MYPAGE_LOADED",
      data: await userHealthInfoService.getUserInfo(userId),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
    next(error);
  }
};

// const userHealthInfoUpdate = async (req, res, next) => {
//   try {
//     const {
//       nickname,
//       profileImg,
//       height,
//       weight,
//       workoutLoad,
//       interestedWorkout,
//       userId,
//     } = req.body;
//     return res.status(200).json({
//       message: "USER_INFORMATION_UPDATED",
//       data: ""
//     })
//   } catch (err) {
//     throwError(400, "INTERNAL_ERROR");
//     console.error(err);
//   }
// };

module.exports = {
  viewUserHealthInfo,
  // userHealthInfoeUpdate,
};
