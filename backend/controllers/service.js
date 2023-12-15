// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs').promises;
const Service = require('../models/Service');


exports.allService = (req, res, next) => {
    Service.findAll()
    .then(Services => res.send(Services))
    .catch(error => res.status(500).json({ error }));
};

exports.service = (req, res, next) => {

    Service.findOne({where: {id: req.params.id}})
    .then(data => {
        
        const DataService = `../data/${data.name}.json`;
        const filePath = path.join(__dirname, DataService);
    
        fs.readFile(filePath, 'utf8')
            .then(data => {
                res.send(data);
            })
            .catch(error => {
                res.status(500).send('Erreur lors du téléchargement du fichier.');
            });
    })   

  
};

// exports.service = (req, res, next) => {
//     User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
//     .then(user => res.send(user))
//     .catch(error => res.status(500).json({ error }));
// };

// exports.addService = (req, res, next) => {
//     User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
//     .then(user => res.send(user))
//     .catch(error => res.status(500).json({ error }));
// };

// exports.modifyService = (req, res, next) => {
//     User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
//     .then(user => res.send(user))
//     .catch(error => res.status(500).json({ error }));
// };

// exports.deleteService = (req, res, next) => {
//     User.findOne({where: {id: req.params.id}, attributes: {exclude: ['password']}})
//     .then(user => res.send(user))
//     .catch(error => res.status(500).json({ error }));
// };
