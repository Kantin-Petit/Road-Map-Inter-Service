// const bcrypt = require('bcrypt');
const func = require('../function');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../data/thematics');
const Thematic = require('../models/Thematic');

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

exports.getOneThematic = (req, res, next) => {
  const name = req.params.name;

  try {
    const filePath = path.join(directoryPath, `${name}.json`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(content);

    res.status(200).json(jsonData);
  } catch (error) {
    res.status(404).json({ error: `Thématique ${name} introuvable` });
  }
}

exports.createThematic = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color ? req.body.color : '#000000';
  const randFile = `themati${name}`;

  const thematic = new Thematic({
    name: name,
    file_name: randFile,
  })
  thematic.save()
    .then((data) => {
      const fileName = `thematic${data.id}`;
      data.update({
        file_name: fileName
      })
        .then(() => {
          createThematicFile(data.id, data.file_name, name, description, color);
          res.status(201).json({ message: `Thématique ${name} créée` });
        }).catch(error => res.status(400).json({ error }));

    })
    .catch(error => res.status(400).json({ error }));

}

async function createThematicFile(id, file_name, name, description, color) {
  try {
    const filePath = path.join(directoryPath, `${file_name}.json`);

    if (fs.existsSync(filePath)) {
      res.status(409).json({ error: `Thématique non unique` });
    } else {
      const thematic = {
        id: id,
        name: name,
        description: description,
        color: color
      };

      const content = JSON.stringify(thematic);
      fs.writeFileSync(filePath, content, 'utf-8');
    }
  } catch (error) {
    console.log(`Erreur lors de la création du fichier JSON : ${error.message}`);
  }
}


exports.deleteThematic = (req, res, next) => {

  const id = req.params.id;

  Thematic.findOne({ where: { id: id } })
    .then(thematic => {
      thematic.destroy()
        .then((response) => {
          deleteThematicFile(response.dataValues);
          res.status(200).json({ message: `Thématique supprimée` })
        }
        )
        .catch(error => res.status(400).json({ error }));
    })
}

async function deleteThematicFile(data) {

  const cheminDuFichier = path.join(directoryPath, `${data.file_name}.json`);

  try {
    const contenuDuFichier = fs.readFileSync(cheminDuFichier, 'utf-8');
    const fichierJson = JSON.parse(contenuDuFichier);

    if (fichierJson.id == data.id) {
      fs.unlinkSync(cheminDuFichier);
      console.log(`Fichier JSON supprimé avec succès.`);
    } else {
      console.log(`L'ID du fichier JSON ne correspond pas.`);
    }
    console.log('Le fichier a été supprimé avec succès.');
  } catch (erreur) {
    console.log(`Erreur lors de la suppression du fichier : ${erreur.message}`);
  }
}

exports.updateThematic = (req, res, next) => {

  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color ? req.body.color : '#000000';

  Thematic.findOne({ where: { id: id } })
    .then(thematic => {
      thematic.update({
        name: name,
      })
        .then((response) => {
          updateThematicFile(response.dataValues, description, color);
          res.status(200).json({ message: `Thématique modifiée` })
        }
        )
        .catch(error => res.status(400).json({ error }));
    })
}

async function updateThematicFile(data, description, color) {

  const cheminDuFichier = path.join(directoryPath, `${data.file_name}.json`);

  try {
    const contenuDuFichier = fs.readFileSync(cheminDuFichier, 'utf-8');
    const fichierJson = JSON.parse(contenuDuFichier);

    if (fichierJson.id == data.id) {
      const thematic = {
        id: data.id,
        name: data.name,
        description: description,
        color: color
      };

      const content = JSON.stringify(thematic);
      fs.writeFileSync(cheminDuFichier, content, 'utf-8');
      console.log(`Fichier JSON modifié avec succès.`);
    } else {
      console.log(`L'ID du fichier JSON ne correspond pas.`);
    }
    console.log('Le fichier a été modifié avec succès.');
  } catch (erreur) {
    console.log(`Erreur lors de la modification du fichier : ${erreur.message}`);
  }
}

