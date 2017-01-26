const User = require('../models').User;

module.exports = {
    create(req, res) {
        return User
            .create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                roleId: req.body.roleId
            })
            .then((newUser) => res.status(201).send(newUser))
            .catch((error) => res.status(401).send(error))
    },

    index(req, res) {
        return User
            .all()
            .then((users) => res.status(201).send(users))
            .catch((error) => res.status(401).send)
    }
}