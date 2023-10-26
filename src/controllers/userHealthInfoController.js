const { userHealthInfoService } = require("../services");

const viewUserHealthInfo = async (req, res, next) => {
  try {
    const userId = req.userId
    const { workoutRcmdLimit } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    }
    return res.status(200).json({
      message: "MYPAGE_LOADED",
      data: await userHealthInfoService.getUserInfo(userId, workoutRcmdLimit),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ message: error.message });
    next(error);
  }
};

const getUpdatingUserInfo = async (req, res, next) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    };
    return res.status(200).json({
      message: "MODIFYING_USER_INFO_LOADED",
      data: await userHealthInfoService.getToBeUpdatedInfo(userId)
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({message: error.message});
    next(error);
  };
};

const updateUserHealthInfo = async (req, res, next) => {
  try {
    const userId = req.userId
    const {
      gender,
      birthday,
      height,
      weight,
      workoutLoad,
      interestedWorkout,
      specialized,
      imgUrl,
    } = req.body;
    if (!req.file) {
      return res.status(200).json({
        message: "USER_INFO_UPDATED",
        data: await userHealthInfoService.updateUserInfo(
          userId,
          imgUrl,
          gender,
          birthday,
          height,
          weight,
          workoutLoad,
          interestedWorkout,
          specialized,
        ),
      })
    };
    const imageUrl = req.file.location
    return res.status(200).json({
      message: "USER_INFO_UPDATED",
      data: await userHealthInfoService.updateUserInfo(
        userId,
        imageUrl,
        gender,
        birthday,
        height,
        weight,
        workoutLoad,
        interestedWorkout,
        specialized,
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({message: error.message});
    next(error);
  }
};

module.exports = {
  viewUserHealthInfo,
  getUpdatingUserInfo,
  updateUserHealthInfo,
};
