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

const updateUserHealthInfo = async (req, res, next) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    };
    const {
      gender,
      birthday,
      height,
      weight,
      workoutLoad,
      interestedWorkout,
      specialized
    } = req.body;
    return res.status(200).json({
      message: "USER_INFORMATION_UPDATED",
      data: await userHealthInfoService.updateUserInfo(
        userId,
        gender,
        birthday,
        height,
        weight,
        workoutLoad,
        interestedWorkout,
        specialized,
        userId
      ),
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({message: error.message});
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
      message: "TOBE_UPDATED_INFO_LOADED",
      data: await userHealthInfoService.getToBeUpdatedInfo(userId)
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({message: error.message});
    next(error);
  };
};

const userProfileImgUpload = async (req, res, next) => {
  try {
    const userId = req.userId
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    };
    const { imgUrl } = req.body
    return res.status(200).json({
      message: "USER_IMG_UPLOADED",
      data: await userHealthInfoService.updateUserImg(userId, imgUrl)
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({message: error.message});
    next(error);
  };
};

module.exports = {
  viewUserHealthInfo,
  getUpdatingUserInfo,
  updateUserHealthInfo,
  userProfileImgUpload
};
