const  jwt =  require('jsonwebtoken');
require('dotenv').config();


const auth = (req, res, next) => {
    const token = req.header('gutenberg-auth-token');
    if (!token) {
        return res.status(401).send('Access denied, no Token provided.');
    }

    try {
        const secret = process.env.JWT_SECRET;
        const decoded = jwt.verify(token, secret); 
        req.user = {
            id: decoded.__dirnameid,
        }; 
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token!' });
    }
};

module.exports = auth;
