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
    const userId = req.params.userId;
    console.log("userId before isSubscriptDao call:", userId);

    const { content, img_url } = req.body;
    if (!userId) throwError(400, "KEY_ERROR");
    if (!content) throwError(400, "NO_CONTENT");
    return res
      .status(201)
      .json({ message: await createPostService(userId, content, img_url) });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    if (!userId || !postId) throwError(400, "KEY_ERROR");
    return res.status(200).json({
      message: "DELETE_POST",
      data: await deletePostService(userId, postId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const getAllPostController = async (req, res, next) => {
  try {
    const { userId, postId } = req.query;
    if (!userId) throwError(400, "KEY_ERROR");
    if (!postId) throwError(400, "NO_POST");
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
    const userId = req.params.userId;
    const content = req.body.content;
    const postId = req.params.postId;

    if (!userId || !content || !postId) {
      console.log("Missing userId, content, or postId");
      throwError(400, "KEY_ERROR");
    }
    return res.status(200).json({
      message: "CREATE_COMMENT",
      data: await createCommentService(userId, content, postId),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deleteCommentController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const commentId = req.body;
    const postId = req.params.postId;
    if (!userId || !commentId || !postId) throwError(400, "KEY_ERROR");
    return res.status(200).json({
      message: "DELETE_COMMENT",
      data: await deleteCommentService(userId, commentId, postId),
    });
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
  deleteCommentController,
};
