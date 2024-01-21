// const bcrypt = require('bcrypt');
const func = require('../function');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../data/thematics');

exports.getAllThematics = (req, res, next) => {

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