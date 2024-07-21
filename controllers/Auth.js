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
                token:token
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

module.exports = { login, signup };


