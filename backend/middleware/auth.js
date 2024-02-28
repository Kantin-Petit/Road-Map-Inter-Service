const jwt = require('jsonwebtoken');
require('dotenv').config()
const SECRETKEY = process.env.SECRETKEY
const User = require('../models/User');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, SECRETKEY, function (err, decoded) {
            if (err) return res.status(401).json({ error: err });

            const userId = decoded.id;

            User.findOne({
                attributes: ['role', 'service_id'],
                where: { id: userId }
            })
                .then(user => {
                    const userRole = user.role;
                    const userServiceId = user.service_id;
                    req.auth = { userId, userRole, userServiceId };
                    next();
                })
                .catch(error => { return res.status(500).json({ error }) });

        });

    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifié !' });
    }

}