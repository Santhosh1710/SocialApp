import db from "../connect.js";
import jwt from "jsonwebtoken";
export const getLikes = (req, res) =>{
    const q = "SELECT userId FROM likes WHERE postId = ?";
    db.query(q, [req.query.postId], (err, data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(data.map(like => like.userId));
    })
}
export const postLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in!");
    jwt.verify(token, "secretkey", (err, data) => {
        if (err)
            return res.status(403).send("Invalid token!");
      const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?,?)";
      const values = [data.id, req.body.postId];
      console.log(values)
      db.query(q, values, (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Liked successfully!");
      });
    });
  };
  
  export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, data) => {
      if (err) return res.status(403).send("Invalid token!");
      const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";
      db.query(q, [data.id, req.query.postId], (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Removed successfully!");
      });
    });
  };