const { throwError } = require("../utils");
const { communityService } = require("../services");
const {
  getPostService,
  createPostService,
  deletePostService,
  createCommentService,
} = communityService;

const getPostController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const postId = req.query.tab;
    if (!postId) throwError(400, "N0_POST_ID");
    return res.status(200).json({
      message: "GET_POST",
      data: await getPostService(userId, postId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createPostController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content, img_url } = req.body;
    if (userId) throwError(400, "KEY_ERROR");
    if (!content) throwError(400, "NO_CONTENT");
    if (!img_url) throwError(400, "NO_IMG_URL");
    return res
      .status(201)
      .json(await createPostService(userId, content, img_url));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { postId } = req.body;
    if (!postId) throwError(400, "KEY_ERROR");
    return res
      .status(200)
      .json({ message: await deletePostService(userId, postId) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  getPostController,
  createPostController,
  deletePostController,
};
