const express = require("express")
const userRouter = express.Router();
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Get users data

userRouter.get("/", async (req, res) => {
    try {
        const users = await UserModel.find();
        res.json(users);
    } catch (err) {
        console.log(err)
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

// Get all tasks by User Id

userRouter.get("/:id", async (req, res) => {
    const userID = req.body.userID;
    try {
        const user = await UserModel.find({ _id: userID })
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

// User Registration: POST

userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    try {
        bcrypt.hash(pass, 6, async (err, hash_pass) => {
            if (err) {
                console.log({ "msg": "Something went wrong" })
            } else {
                const user = new UserModel({ name, email, pass: hash_pass })
                await user.save();
                res.send("Resgistration successful")
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }

})

// User Login: POST

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email })
        console.log(user);
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, async (err, result) => {
                if (!result) {
                    console.log(err);
                    res.send({ "msg": "something went wrong" });
                } else {
                    let token = jwt.sign({ userID: user[0]._id }, process.env.KEY);
                    const { _id, name, email } = user[0];
                    res.json({ msg: "login successfully", token, user: { _id, name, email } });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ "msg": "Something went wrong" })
    }
})

module.exports = {
    userRouter
}