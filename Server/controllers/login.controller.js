const db = require("../models/user.model");
const User = db.user
const UserX = require("../models/user.model");
// const tokenList = {}
const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
// const bcrypt = require('bcryptjs')


exports.signup = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const existingUser = await UserX.findOne({ email: email });
        if (existingUser) {
            return res.status(400).send({
                status: "error",
                message: "email already exists",
            });
        }
        const result = await db.create({
            name: name,
            email: email,
            password: password,
            phone: phone,
        });

        const token = jwt.sign(
            { email: result.email, id: result.id },
            config.secret
        );

        res.status(201).json({
            user: result,
            token: token,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: "something went wrong, please try again later"
        });
      }
};

exports.login = async (req, res) => {
    console.log("at login controller")
    const { email, password } = req.body;

    try {
        const existingUsers = await User.findOne({ email: email });
        if (!existingUsers) {
            return res.status(404).json({ message: "User not found" });
        } else if (existingUsers.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        } else {
            const token = jwt.sign(
                { email: existingUsers.email, id: existingUsers._id },
                config.secret
            );

            res.status(201).json({
                token: token,
                user: existingUsers,
            });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send({
            status: "error",
            message: "something went wrong, please try again later"
        });
    }
};