const jwt = require('jsonwebtoken');
const User = require('../models/user');
// Auth middleware to verify user access token
const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'thisismychatbot');
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({error: 'Please authenticate', value: false});
    };
};

module.exports = auth;