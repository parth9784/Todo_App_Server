require("dotenv").config();
const jwt = require("jsonwebtoken");

function Authmid(req, res, next) {
    const authHeader = req.headers.authorization;
    const tokenFromBody = req.body.token;

    let token;

    if (authHeader) {
        token = authHeader.split(' ')[1];
    } else if (tokenFromBody) {
        token = tokenFromBody;
    }

    if (!token) {
        console.log('No token provided');
        return res.status(401).send('Unauthorized: No token provided');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userid = decoded.id;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        res.status(401).send('Unauthorized: Invalid token');
    }
}

module.exports = { Authmid };
