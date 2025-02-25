const db = require("../config/connection");
const moment = require("moment");
const addComment = (req, res) => {
  const { text, postId } = req.body;
  const { id } = req.user;

  if (!text) return res.status(400).json("text is required");
  const sql = `INSERT INTO comments (text, commentUserId, postId, createdAt) VALUE (?)`;
  const values = [
    text,
    id,
    postId,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

const getCommentsByPostId = (req, res) => {
  const postId = req.query.postId;
  const sql = `SELECT c.*, u.username, u.avatar FROM comments AS c LEFT JOIN user AS u ON c.commentUserId = u.id WHERE c.postId =? `;
  db.query(sql, [postId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
};

module.exports = {
  addComment,
  getCommentsByPostId,
};
