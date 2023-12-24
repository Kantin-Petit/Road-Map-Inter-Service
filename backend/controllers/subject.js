// const bcrypt = require('bcrypt');
const Subject = require('../models/Subject');
const func = require('../function');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../data'); 

exports.allSubjects = (req, res, next) => {
    Subject.findAll()
    .then(users => res.send(users))
    .catch(() => res.status(500).json({ message: 'Une erreur s\'est produite lors de la récupération des sujets.' }));
};

exports.filteredSubjects = (req, res, next) => {

    const { service, sujet } = req.query;
    const filePath = path.join(directoryPath, `${service}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {

      if (err) {
        res.status(500).json({ message: 'Erreur lors de la lecture du fichier JSON' });
        return;
      }
  
      try {

        const serviceData = JSON.parse(data);
      
        if (!serviceData[service]) {
          res.status(404).json({ message: `Le service "${service}" n'a pas été trouvé` });
          return;
        }
    
        const timelines = serviceData[service].timelines;
        const filteredTimelines = timelines.filter(timeline => timeline.sujet === sujet);
    
        res.status(200).json(filteredTimelines);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données JSON' });
      }
    });
};