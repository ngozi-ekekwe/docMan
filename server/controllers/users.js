const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
    create(req, res) {
        User.findOne({where: {email: req.body.email}})
            .then((existingUser) => {
                if(existingUser) {
                    return res.status(409).send({message: 'user exits'});
                }
            });
            User.create(req.body)
                .then((newUser) => {
                    const token = jwt.sign (newUser, "kjzdfhkjhfghzkjvhkashd,hdjgvmbxmvzbvbc",{
                    expiresIn: '24h'
                    });
                    return res.status(200).send({
                        success: true,
                        message: 'Authentication successful. User logged in',
                        token: token
                    });
                })
                .catch((error) => { 
                    res.status(409).send(error);
                })
    },

    index(req, res) {
        return User
            .all()
            .then((users) => res.status(201).send(users))
            .catch((error) => res.status(401).send)
    },

    retrieve(req, res) {
        return User
            .findById(req.params.id)
            .then((user) => {
                if(!user) {
                    return res.status(404).send({message: 'user not found'});
                }
                res.send(user);
            })
    }
    
}