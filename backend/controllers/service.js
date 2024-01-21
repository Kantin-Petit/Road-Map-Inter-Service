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

exports.getAllservicesName = async (req, res, next) => {
  try {
    const files = fs.readdirSync(directoryPath);
    const resultats = {};

    for (const fichier of files) {
      const cheminFichier = path.join(directoryPath, fichier);
      try {
        const contenuJSON = JSON.parse(fs.readFileSync(cheminFichier, 'utf-8'));
        if (fs.statSync(cheminFichier).isFile() && fichier.endsWith('.json') && contenuJSON && contenuJSON.name) {
          const fileName = fichier.replace('.json', '');
          resultats[fileName] = { "name": contenuJSON.name };
        }
      } catch (erreurLecture) {
        console.error(`Erreur lors de la lecture du fichier ${fichier}: ${erreurLecture.message}`);
      }
    }

    res.status(200).json(resultats);
  } catch (erreur) {
    console.error(`Erreur lors de la lecture du répertoire ${directoryPath}: ${erreur.message}`);
    return res.status(500).json({ status: 'error', message: erreur.message });
  }
};



exports.getOneservice = (req, res, next) => {

  const serviceName = req.params.name;
  const { thematic } = req.query;
  const filePath = path.join(directoryPath, `${serviceName}.json`);

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Erreur lors de la lecture du fichier JSON.');
    }
    try {
      const serviceData = JSON.parse(data);
      let filteredService = { ...serviceData };

      if (thematic !== '' && thematic != 'null') {
        const thematicsArray = thematic.split(',');
        filteredService.timelines = serviceData.timelines.filter(timeline => thematicsArray.includes(timeline.thematic));
      }

      const serviceObject = { [serviceName]: filteredService };

      res.status(200).json(serviceObject);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du traitement des données JSON' });
    }
  })

};

exports.getFilteredServices = (req, res, next) => {

  const filteredServices = {};

  try {
    const { services, thematics } = req.body;

    for (const serviceItem of Object.keys(services)) {

      const isServiceActive = services[serviceItem];

      if (isServiceActive) {
        const filePath = path.join(directoryPath, `${serviceItem}.json`);

        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const jsonData = JSON.parse(content);

          if (jsonData && jsonData.timelines) {
            let filteredTimelines = jsonData.timelines;

            if (thematics && thematics[serviceItem]) {
              const serviceThematics = thematics[serviceItem];

              filteredTimelines = filteredTimelines.filter(timeline => {
                const thematicKeys = Object.keys(serviceThematics);
                return thematicKeys.includes(timeline.thematic) && serviceThematics[timeline.thematic];
              });
            }

            if (!filteredTimelines || !filteredTimelines.length) filteredTimelines = jsonData.timelines;

            jsonData.timelines = filteredTimelines;
            filteredServices[serviceItem] = jsonData;
          }
        }
      }
    }

    res.status(200).json(filteredServices);
  } catch (error) {
    res.status(500).json({ error: `Erreur lors de la lecture du fichier JSON : ${error.message}` });
  }

};