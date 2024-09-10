import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authorization token is missing or invalid' });
    }
    const token = authHeader.split(' ')[1];
    console.log("token", token)
    if (token) {
        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, data) => {
            if (err) {
                res.status(498).json({ message: 'token is not valid' });
            }
            req.user = data;
            next();
        });
    } else {
        res.status(498).json({ message: 'token is not valid' });
    }
};

export default verifyToken;
