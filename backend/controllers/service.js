// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const Service = require('../models/Service');
const directoryPath = path.join(__dirname, '../data'); 

exports.allService = async (req, res, next) => {

  let fileContents = {};

  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const fileName = file.replace('.json', '');
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
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

    const { fileName } = req.params;
  
    if (!fs.existsSync(directoryPath)) {
      return res.status(404).send('Le dossier spécifié n\'existe pas.');
    }
  
    const filePath = path.join(directoryPath, `${fileName}.json`);
  
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Le fichier JSON spécifié n\'existe pas.');
    }
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Erreur lors de la lecture du fichier JSON.');
      }
      res.status(200).json(JSON.parse(data));
    });
  
};

exports.getAllServiceName = (req, res, next) => {

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        return res.status(500).json({ error: 'Erreur lors de la lecture du répertoire' });
      }
  
      const fileNames = files
        .filter(file => path.extname(file).toLowerCase() === '.json')
        .map(file => path.basename(file, '.json')); 
  
      res.status(200).json({ files: fileNames });
    });
}

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
