const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided. Access denied.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        console.log(req.user)
        next();

    } catch (error) {
        console.error('JWT auth error:', error);
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = protect;