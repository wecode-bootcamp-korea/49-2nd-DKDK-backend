const { dataSource } = require("./dataSource");
//글 불러오기
const getPostDao = async (userId, postId) => {
  return await dataSource.query(
    `
        SELECT * FROM posts WHERE user_id = ? AND post_id = ?
        `,
    [userId, postId]
  );
};
//글 쓰기
const createPostDao = async (userId, content, img_url) => {
  return await dataSource.query(
    `
        INSERT INTO posts (user_id, content, img_url)
        VALUES (?, ?, ?)
        `,
    [userId, content, img_url]
  );
};
// 글 지우기
const deletePostDao = async (userId, postId) => {
  return await dataSource.query(
    `
        DELETE FROM posts WHERE user_id =? AND id = ? 
        `,
    [userId, postId]
  );
};
// 댓글달기
const createCommentDao = async (userId, postId, content) => {
  return await dataSource.query(
    `
        INSERT INTO comments (userId, postId, content)
        VALUES (?,?,?)
        `,
    [userId, postId, content]
  );
};

const deleteCommentDao = async (userId, postId, content) => {
  return await dataSource.query(
    `
        DELETE FROM comments WHERE (user_id, postId, content)
        VALUES (?,?,?)
        `[(userId, postId, content)]
  );
};

module.exports = {
  createPostDao,
  getPostDao,
  deletePostDao,
  createCommentDao,
};
