const { throwError } = require("../utils/throwError");
const { communityService } = require("../services");
const {
  createPostService,
  deletePostService,
  createCommentService,
  getAllPostService,
  deleteCommentService,
  getPostListService,
} = communityService;

const createPostController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log(userId);
    const { content, img_url } = req.body;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!content) return res.status(400).json({ message: "NO_CONTENT" });
    return res.status(200).json({
      message: "CREATE_POST",
      data: await createPostService(userId, content, img_url),
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePostController = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const postId = req.params.postId;
    if (!userId || !postId)
      return res.status(400).json({ message: "KEY_ERROR" });
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
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    if (!postId) return res.status(400).json({ message: "NO_POST" });
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

    if (!userId || !content || !postId)
      return res.status(400).json({ message: "KEY_ERROR" });
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

const getPostListController = async (req, res, next) => {
  try {
    // const { userId } = req.userId;
    const userId = 2;
    if (!userId) return res.status(400).json({ message: "KEY_ERROR" });
    return res.status(200).json({
      message: "GET_POST",
      data: await getPostListService(userId),
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
  getPostListController,
};
