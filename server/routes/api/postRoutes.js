const router = require("express").Router();
const { posts, createPost } = require("../../controllers/posts");
const { protect } = require("../../utils/auth");

router.get("/posts", posts);
router.post("/create", protect, createPost);

module.exports = router;
