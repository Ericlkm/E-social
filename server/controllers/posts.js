const db = require("../config/connection");
const moment = require("moment");
const posts = (req, res) => {
  const sql = `SELECT p.*, u.username, u.email, u.avatar FROM post AS p LEFT JOIN user AS u ON p.userId = u.id`;
  db.query(sql, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0)
      return res.status(404).json({ message: "no posts found" });
    console.log(data);
    return res.status(200).json(data);
  });
};

const createPost = (req, res) => {
  const { id } = req.user;
  const { caption, image } = req.body;
  if (!caption) return res.status(400).json("caption is required");

  const token = req.headers.authorization.split(" ")[1].trim();

  if (!token) return res.status(401).json("Unauthorized");

  const sql = `INSERT INTO post (caption, image, userId, createdAt) VALUES (?)`;
  const values = [
    caption,
    image,
    id,
    moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
  ];
  db.query(sql, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({ message: "post created", data });
  });
};

module.exports = { posts, createPost };
