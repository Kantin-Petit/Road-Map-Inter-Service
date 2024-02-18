const User = require('../models/User');
const Service = require('../models/Service');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

exports.getAllUsers = (req, res, next) => {

    User.findAll({
        attributes: { exclude: ['password'] },
        include: [{
            model: Service,
            attributes: ['name']
        }]
    })
        .then(users => res.send(users))
        .catch(error => res.status(500).json({ error }));
};

exports.getAllUsersFromService = (req, res, next) => {
    const serviceId = req.params.id;

    User.findAll({
        attributes: { exclude: ['password'] },
        include: [{
            model: Service,
            attributes: ['name'],

        }],
        where: {
            service_id: serviceId
        }

    })
        .then(users => res.send(users))
        .catch(error => res.status(500).json({ error }));
};


exports.getOneUser = (req, res, next) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.params.id },
        include: [{
            model: Service,
            attributes: ['name']
        }]
    })
        .then(user => res.send(user))
        .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {

    User.findOne({ where: { id: req.params.id } })
        .then(user => {

            const service = req.body.role === 'admin' ? null : Number(req.body.service_id);
            
            user.first_name = req.body.first_name
            user.last_name = req.body.last_name
            user.email = req.body.email
            user.service_id = service
            user.role = req.body.role

            if (req.body.password) {
                bcrypt.hash(req.body.password, 10)
                    .then((hash) => {
                        user.password = hash;
                        user.save()
                            .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                            .catch(error => res.status(400).json({ error }));
                    })
            }

            if (!req.body.password) {
                user.save()
                    .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
};


exports.deleteUser = (req, res, next) => {
    User.findOne({ where: { id: req.params.id } })
        .then(user => {
            user.destroy()
                .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};