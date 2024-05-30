import db from "../connect.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = (req,res) =>{
    const user = "SELECT * FROM users WHERE username = ?"

    db.query(user, [req.body.username], (err,data) =>{
        if(err) return res.status(500).send(err)
        if(data.length) return res.status(409).json("User already exists!")
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO users (`username`, `email`, `password`, `name`) VALUES (?)"
        const values = [req.body.username, req.body.email, hashedPassword, req.body.name]
        db.query(q, [values], (err, data)=>{
            if(err) return res.status(500).send(err)
            res.status(200).send("User created.")
        })
    })
}

export const login = (req,res) =>{
    const user = "SELECT * FROM users WHERE username = ?"
    db.query(user, [req.body.username], (err, data) =>{
        if(err) return res.status(500).send(err)
        if(data.length === 0) return res.status(404).send("User not found")
        const checkPassword = bcrypt.compareSync(req.body.password, data[0].password)
        if(!checkPassword) return res.status(400).send("Incorrect username or password")
        const token = jwt.sign({id:data[0].id}, "secretkey");
        const {password, ...others} = data[0];

        res.cookie("accessToken", token, {httpOnly : true,}).status(200).send(others);
    })
}

export const logout = (req,res) =>{
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).send("Logged out successfully!")
}

