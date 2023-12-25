// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../data/services'); 

exports.getAllservices = async (req, res, next) => {

  let fileContents = {};

  try {
    const files = fs.readdirSync(directoryPath);

    for (const file of files) {
      if (file.endsWith('.json')) {
        const fileName = file.replace('.json', '');
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        let jsonData = JSON.parse(content);

        fileContents[fileName] = jsonData;
      }
    }

    res.status(200).json(fileContents);
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la lecture du répertoire : ${error.message}` });
  }

};

exports.getOneservice = (req, res, next) => {

    const serviceName = req.params.name
    const { sujet } = req.query;
    
    const filePath = path.join(directoryPath, `${serviceName}.json`);
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send(`Erreur lors de la lecture du fichier JSON.' ${filePath}`);
      }
      try {

        const serviceData = JSON.parse(data);
        let filteredTimelines;

        if(sujet === 'all') {
          filteredTimelines = serviceData;
        }else {
          filteredTimelines = serviceData.timelines.filter(timeline => timeline.sujet === sujet);
        }
    
        res.status(200).json(filteredTimelines);
      } catch (error) {
        res.status(500).json({ message: 'Erreur lors du traitement des données JSON' });
      }
    });
  
};

exports.getFilteredServices = (req, res, next) => {

  const { service, sujet } = req.query;

  try {
    const files = fs.readdirSync(directoryPath);
    let services = {};

    for (const file of files) {
      if (file.endsWith('.json')) {
        const fileName = file.replace('.json', '');
        const filePath = path.join(directoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        let jsonData = JSON.parse(content);

        if (fileName === service) {
          if (jsonData && jsonData.timelines) {
            jsonData.timelines = jsonData.timelines.filter(timeline => timeline.sujet === sujet);
          }
        }

        services[fileName] = jsonData;
      }
    }

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la lecture du répertoire : ${error.message}` });
  }
};