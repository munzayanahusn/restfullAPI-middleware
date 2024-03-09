const jwt = require('jsonwebtoken');

const createToken = (data) => {
    const token = jwt.sign(
        data, 
        process.env.JWT_KEY, 
        { expiresIn: '5h' }
    );
    return token;
};

const decodeToken = (token) => {
    try {
        const decodedData = jwt.verify(token, process.env.JWT_KEY);
        return decodedData;
    } catch (error) {
        console.error(error);
        return null;
    }
};

module.exports = { createToken, decodeToken };