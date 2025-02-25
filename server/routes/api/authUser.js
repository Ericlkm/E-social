const router = require("express").Router();
const {
  register,
  login,
  getProfile,
  me,
} = require("../../controllers/authentication");
const { protect } = require("../../utils/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getProfile);
router.get("/me", protect, me);

module.exports = router;
