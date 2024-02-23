const Service = require('../models/Service');
const User = require('../models/User');
const Timeline = require('../models/Timeline');
const fs = require('fs');

exports.getAllServices = (req, res, next) => {

  Service.findAll()
    .then(services => res.send(services))
    .catch(error => res.status(500).json({ error }));

};

exports.getOneService = (req, res, next) => {

  Service.findOne({ where: { id: req.params.id } })
    .then(service => res.send(service))
    .catch(error => res.status(500).json({ error }));

};

exports.createService = (req, res, next) => {

  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;

  const service = new Service({
    name: name,
    image: image,
    description: description
  })

  service.save()
    .then(() => res.status(201).json({ message: 'Service créé !' }))
    .catch(error => res.status(400).json({ error }));

}

exports.deleteService = (req, res, next) => {
  const id = req.params.id;

  sequelize.transaction(async (transaction) => {
    await User.destroy({ where: { service_id: id }, transaction });
    await Timeline.destroy({ where: { service_id: id }, transaction });
    await Service.destroy({ where: { id: id }, transaction });

    res.status(201).json({ message: 'Service supprimé !' });
  })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.updateService = (req, res, next) => {
  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;

  Service.findOne({ where: { id: id } })
    .then(service => {
      if (!service) {
        return res.status(404).json({ message: 'Service non trouvé' });
      }

      let oldImage = service.image;

      if (req.file) {
        const newImage = req.file.filename;
        service.image = newImage;
        fs.unlink(`images/services/service${id}/${oldImage}`, (err) => {
          if (err) {
            console.error("Erreur lors de la suppression de l'image précédente :", err);
          }
        });
      }

      service.name = name;
      service.description = description;

      return service.save();
    })
    .then(() => res.status(200).json({ message: 'Service modifié !', image: req.file ? req.file.filename : null }))
    .catch(error => res.status(500).json({ error }));
}