const user = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function signup(req, res) {
    try {
        const { email, username, password } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({
                msg: "Data toh pura bhejo yrr.."
            });
        }
        
        const already = await user.findOne({ email });
        if (already) {
            return res.status(400).json({
                msg: "User already Registered.."
            });
        }
        
        const hashed = await bcrypt.hash(password, 10);
        await user.create({
            email,
            password: hashed,
            username
        });
        
        res.status(200).json({
            msg: "User Registered Successfully..."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Sign Up me dikkat h.."
        });
    }
}

async function login(req, res) {
    try {
        const { identity, password } = req.body;
        if (!identity || !password) {
            return res.status(400).json({
                msg: "Data toh pura bhejo yrr.."
            });
        }
        
        const data = await user.findOne({ $or: [{ email: identity }, { username: identity }] });
        if (!data) {
            return res.status(401).json({
                msg: "User not Found.."
            });
        }
        
        const isMatch = await bcrypt.compare(password, data.password);
        if (isMatch) {
            const payload = {
                id: data._id,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "8h"
            });
            res.status(200).json({
                msg: "Login Successful",
                token
            });
        } else {
            res.status(401).json({
                msg: "Invalid Credentials..."
            });
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            msg: "Login me dikkat h.."
        });
    }
}

async function Update_Password(req, res) {
    try {
        const { email, pass } = req.body;
        const data = await user.findOne({ email });
        if (!data) {
            return res.status(404).json({ msg: "User not found" });
        }
        data.password = await bcrypt.hash(pass, 10);
        await data.save();
        res.status(200).json({ msg: "Password Changed Successfully.." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Update Password me dikkat h..." });
    }
}


async function forgotpassword(req, res) {
    try {
        const { email } = req.body;
        const data = await user.findOne({ email });
        if (!data) {
            return res.status(400).json({ msg: "Register First...." });
        }
        res.status(200).json({ msg: "User Found may Proceed to reset password.." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Forgot Password me dikkat h..." });
    }
}



module.exports = { login, signup,forgotpassword,Update_Password};


