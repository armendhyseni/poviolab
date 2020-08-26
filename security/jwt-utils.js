const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwtconfig');

module.exports = {
    verify: async function (token) {
        return jwt.verify(token, jwtConfig.secret);
    },
    generateToken: async function (data) {
        if (typeof data.password !== "undefined") delete data.password;
        return jwt.sign(data, jwtConfig.secret, {expiresIn: jwtConfig.expiresIn});
    },
    authenticateToken: async function (req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (token == null) return res.status(401).json({message: "Unauthorized"});
        jwt.verify(token, jwtConfig.secret, (err, user) => {
            if (err) return res.status(403).json({message: "Token expired"});
            req.user = user;
            next()
        })
    }
};



