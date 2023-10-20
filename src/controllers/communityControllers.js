const { throwError } = require("../utils/throwError");
const { communityService } = require("../services");
const {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
} = communityService;

const createPostController = async (req, res, next) => {
  try {
    const userId = 2;
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
    const userId = 2;
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

const getAllPostController = async (req, res, next) => {
  try {
    const userId = 2;
    const postId = req.body;
    if (!postId) throwError(400, "N0_POST_ID");
    return res.status(200).json({
      message: "GET_POST",
      data: await getAllPostService(userId, postId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const createCommentController = async (req, res, next) => {
  try {
    const userId = req.body;
    const postId = req.query.tab;
    if (!post) throwError(400, "게시물이 없습니다");
    return res.status(200).json({
      message: "CREATE_COMMENT",
      data: await createCommentService(userId, postId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteContnetController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { content } = req.body;
    if (!userId) throwError(400, "KEY_ERROR");
    return res
      .status(200)
      .json({ message: await deleteCommentService(userId, content) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  createPostController,
  deletePostController,
  getAllPostController,
  createCommentController,
  deleteContnetController,
};
