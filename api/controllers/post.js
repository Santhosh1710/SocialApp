import db from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");
  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).send("Invalid token!");
    const q = userId !== "undefined"
      ? `
        SELECT p.*, u.id AS userId, u.name, u.profilePic 
        FROM posts AS p 
        JOIN users AS u ON u.id = p.userId WHERE p.userId = ? 
        ORDER BY p.createdAt DESC
    `
      : `
            SELECT p.*, u.id AS userId, u.name, u.profilePic 
            FROM posts AS p 
            JOIN users AS u ON u.id = p.userId 
            LEFT JOIN relationships AS r on (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userID = ?
            ORDER BY p.createdAt DESC
        `;

    const values = userId !== "undefined" ? [userId] : [data.id, data.id];
    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Database query error: ", err);
            return res.status(500).json({ error: "Database query error" });
        }
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).send("Invalid token!");
    const q =
      "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";
    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      data.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) {
        console.error("Database query error: ", err);
        return res.status(500).send({ error: "Database query error" });
      }
      return res.status(200).send("Posted successfully!");
    });
  });
};
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, data) => {
      if (err) return res.status(403).send("Invalid token!");
      const q =
        "DELETE FROM posts WHERE `id` = ? AND `userId` = ?";

      db.query(q, [req.params.id,data.id], (err, data) => {
        if (err) {
          console.error("Database query error: ", err);
          return res.status(500).json({ error: "Database query error" });
        }
        if(data.affectedRows === 0) return res.status(403).send("You can't delete this post!");
        return res.status(200).send("Posted Removed successfully!");
      });
    });
};
