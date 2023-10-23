const { userHealthInfoService } = require("../services");

const viewUserHealthInfo = async (req, res, next) => {
  try {
    const { userId, workoutRcmdLimit } = req.query;
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
    const { userId } = req.query;
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
      data: await userHealthInfoService.updateUserInfo( // 이 친구가 어디에 몇개가 바뀌었느지 보여주면 좋을것 같음
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
    const {userId} = req.query;
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
    const { userId } = req.query;
    if (!userId) {
      return res.status(400).json({ message: "KEY_ERROR - ID" });
    };
    const { imgUrl } = req.body
    console.log(imgUrl,"제발 잘 들어온다고 말해줘")
    return res.status(200).json({
      message: "USER_IMG_UPLOADED",
      data: await userHealthInfoService.updateUserImg(userId, imgUrl) // 이 친구가 어디에 몇개가 바뀌었느지 보여주면 좋을것 같음
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
