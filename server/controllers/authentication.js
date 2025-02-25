const bcrypt = require("bcrypt");
const { signToken } = require("../utils/auth");
const db = require("../config/connection");

const register = (req, res) => {
  const { username, email, password, avatar } = req.body;
  if (!username || !email || !password)
    return res.status(400).json("All fields are required");

  const sql = `SELECT * FROM user WHERE email =?`;
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length) return res.status(400).json("Email already exists");
    const sql = `INSERT INTO user (username, email, password, avatar) VALUE(?)`;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const values = [username, email, hash, avatar];
    db.query(sql, [values], (err, data) => {
      if (err) return res.status(400).json(err);
      return res.status(200).json({
        message: "User created successfully",
        data: req.body,
      });
    });
  });
};

const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json("All fields are required");

  const sql = `SELECT * FROM user WHERE email =?`;
  db.query(sql, [email], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length === 0) return res.status(400).json("User not found");
    const correctPw = bcrypt.compareSync(password, data[0].password);
    if (!correctPw) return res.status(400).json("Incorrect password");
    return res.status(200).json({
      id: data[0].id,
      username: data[0].username,
      avatar: data[0].avatar,
      email: data[0].email,
      token: signToken(data[0]),
    });
  });
};

const getProfile = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT * FROM user WHERE id =?`;
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length === 0) return res.status(400).json("Id not found");
    return res.status(200).json(data[0]);
  });
};

const me = (req, res) => {
  const token = req.headers.authorization.split(" ")[1].trim();
  if (!token) return res.status(401).json("Unauthorized");
  const { id } = req.user;

  const sql = `SELECT post.* , user.* FROM user LEFT JOIN post ON user.id = post.userId WHERE user.id = ?`;
  db.query(sql, [id], (err, data) => {
    if (err) return res.status(400).json(err);
    if (data.length === 0) return res.status(400).json("Id not found");
    return res.status(200).json(data);
  });
};

module.exports = {
  register,
  login,
  getProfile,
  me,
};
