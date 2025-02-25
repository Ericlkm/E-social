const { verify, sign } = require("jsonwebtoken");
require("dotenv").config();
const signToken = ({ id, username, email, avatar }) => {
  const payload = {
    id,
    username,
    email,
    avatar,
  };
  return sign({ data: payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.EXPIRE,
  });
};

const protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (token && token.startsWith("Bearer")) {
    try {
      token = token.split(" ")[1].trim();
      const decoded = verify(token, process.env.JWT_SECRET, {
        maxAge: process.env.EXPIRE,
      });
      console.log(decoded);
      req.user = decoded.data;
      next();
    } catch (err) {
      return res.status(401).json("Unauthorized");
    }
  }

  if (!token) {
    return res.status(401).json("Unauthorized");
  }
};

module.exports = {
  signToken,
  protect,
};
