// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs').promises;
const Service = require('../models/Service');
const directoryPath = './data';

// exports.allService = (req, res, next) => {
//     Service.findAll()
//     .then(Services => res.send(Services))
//     .catch(error => res.status(500).json({ error }));
// };

exports.allService = async (req, res, next) => {

    let fileContents = {};

    try {
        const files = await fs.readdir(directoryPath);

        for (const file of files) {
            if (file.endsWith('.json')) {
                const fileName = file.replace('.json', '');
                const filePath = `${directoryPath}/${file}`;
                const content = await fs.readFile(filePath, 'utf-8');
                let jsonData = JSON.parse(content);

                if (jsonData.hasOwnProperty(fileName)) {
                    jsonData = jsonData[fileName]; 
                }

                fileContents[fileName] = jsonData; 
            }
        }

        res.status(200).json(fileContents);
    } catch (error) {
        res.status(500).json({ error: `Erreur lors de la lecture du répertoire : ${error.message}` });
    }
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
