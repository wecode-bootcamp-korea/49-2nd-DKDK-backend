const { mypageService } = require("../services");

const mypageView = async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    }
    return res.status(200).json({
      message: "MYPAGE_LOADED",
      data: await mypageService.mypage(userId),
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({ message: err.message });
    next(err);
  }
};

// const mypageUpdate = async (req, res, next) => {
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
  mypageView,
  // mypageUpdate,
};
