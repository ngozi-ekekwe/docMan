const jsonwebtoken = require('jsonwebtoken');
const db = require('../models');

const secret = 'super dope secret';
const Auth = {
    verifyToken(req, res, next) {
        const token = req.body.token || req.query.token || req.headers['x-access-token'];
        if(!token) {
            return res.status(403).send({ message: 'Unauthorized Access' })
        } 
        //verify jwt token
        jwt.verify(token, secret, (error, decode) => {
            if(error) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });
            }
            else {
                req.decoded = decoded;
                next();
            }
        })
    }
}

module.exports = Auth;

