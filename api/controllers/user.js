import db from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id = ?"

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).send(err);
    const { password, ...others } = data[0];
    return res.status(200).send(others);
  })
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Not logged in!");

  jwt.verify(token, "secretkey", (err, data) => {
    if (err) return res.status(403).send("Invalid token!");

    const q = "UPDATE users SET `name` = ?, `city` = ?, `website` = ?, `coverPic` = ?, `profilePic` = ? WHERE `id` = ?";

    const values = [req.body.name, req.body.city, req.body.website, req.body.coverPic, req.body.profilePic, data.id];
    console.log(values)
    db.query(q, values, (err) => {
      if (err) return res.status(500).send(err);
      if(data.affectedRows === 0) return res.status(403).send("You can't update this user!");
      return res.status(200).send("User has been updated.");
    });
  });
}