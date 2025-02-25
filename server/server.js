const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const app = express();
const db = require("./config/connection");
const routes = require("./routes");
const multer = require("multer");
const { protect } = require("./utils/auth");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../client/public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/auth/upload", protect, upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  return res.status(200).json(file.filename);
});

function startServer() {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3001",
    })
  );
  app.use(routes);

  try {
    db.connect();
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Server is not running");
  }
}

startServer();
