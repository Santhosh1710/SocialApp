import express  from "express";
const app = express();

import fs from "fs";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import authRoutes from "./routes/auth.js";
import relationshipRoutes from "./routes/relationships.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from 'url';
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
}))
app.use(cookieParser())

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const token = req.cookies.accessToken;
    if (!token) return cb(new Error("Not logged in!"), null);

    jwt.verify(token, "secretkey", (err, data) => {
      if (err) return cb(new Error("Invalid token!"), null);
      const uploadPath = path.join(__dirname, `/../client/public/upload/user${(data.id).toString()}`);
      console.log(uploadPath);
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    });
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).send("Invalid token!");
    const file = req.file;
    console.log(req.file.filename);
    res.status(200).send(file.filename);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/relationships", relationshipRoutes);

app.listen(8800, () => console.log("Server started!"))