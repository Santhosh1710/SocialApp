import db from "../connect.js";
import jwt from "jsonwebtoken";
export const getRelationship = (req, res) =>{
    const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";
    db.query(q, [req.query.followedUserId], (err, data) => {
        if(err) return res.status(500).send(err);
        return res.status(200).send(data.map(relationship => relationship.followerUserId));
    })
}
export const postRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in!");
    jwt.verify(token, "secretkey", (err, data) => {
        if (err)
            return res.status(403).send("Invalid token!");
      const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?,?)";
      const values = [data.id, req.body.userId];
      console.log(values)
      db.query(q, values, (err) => {  
        if (err) return res.status(500).send(err);
        return res.status(200).send("Followed successfully!");
      });
    }); 
  };
  
  export const deleteRelationship = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).send("Not logged in!");
  
    jwt.verify(token, "secretkey", (err, data) => {
      if (err) return res.status(403).send("Invalid token!");
      const q = "DELETE FROM relationships WHERE `followerUserId` = ? AND `followedUserId` = ?";
      db.query(q, [data.id, req.query.userId], (err) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send("Unfollowed successfully!");
      });
    });
  };