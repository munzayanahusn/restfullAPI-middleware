const { decodeToken } = require('../auth');

const authenticate = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const token = authorizationHeader.split(' ')[1];
    const decodedData = decodeToken(token);

    if (!decodedData) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (decodedData.role === 'Engineer') {
        next();
    } else {
        res.status(403).json({ message: 'Forbidden' });
    }
};

module.exports = authenticate;
