const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

const authenticateUser = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'YOUR_SECRET_KEY'); // Usa la tua chiave segreta
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized', error: error.message });
    }
};

module.exports = authenticateUser;
