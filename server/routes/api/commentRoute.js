const router = require("express").Router();
const { protect } = require("../../utils/auth");
const {
  addComment,
  getCommentsByPostId,
} = require("../../controllers/comment");

router.post("/comment", protect, addComment);
router.get("/comments", getCommentsByPostId);

module.exports = router;
