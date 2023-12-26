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
        return res.status(500).send('Erreur lors de la lecture du fichier JSON.');
      }
      try {

        const serviceData = JSON.parse(data);
        let filteredTimelines;

        if(sujet === 'all') {
          filteredTimelines = serviceData;
        }else {
          const sujetsArray = sujet.split(','); 
          filteredTimelines = serviceData.timelines.filter(timeline => sujetsArray.includes(timeline.sujet));
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
    const servicesArray = service.split(','); 
    const filteredServices = {};

    for (const serviceItem of servicesArray) {
      const filePath = path.join(directoryPath, `${serviceItem}.json`);

      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        const jsonData = JSON.parse(content);

        if (jsonData && jsonData.timelines) {
          let filteredTimelines = jsonData.timelines;

          if (sujet && sujet !== 'all') {
            const sujetsArray = sujet.split(','); 
            filteredTimelines = filteredTimelines.filter(timeline => sujetsArray.includes(timeline.sujet));
          }

          jsonData.timelines = filteredTimelines;
          filteredServices[serviceItem] = jsonData;
        } else {
          filteredServices[serviceItem] = { error: 'Données non trouvées pour le service spécifié' };
        }
      } else {
        filteredServices[serviceItem] = { error: 'Service non trouvé' };
      }
    }

    res.status(200).json(filteredServices);
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la lecture du fichier JSON : ${error.message}` });
  }
};