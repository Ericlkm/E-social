const router = require("express").Router();
const authUser = require("./authUser");
const postsRoutes = require("./postRoutes");
const commentRoute = require("./commentRoute");

router.use("/", authUser);
router.use("/auth", postsRoutes);
router.use("/auth", commentRoute);

module.exports = router;
