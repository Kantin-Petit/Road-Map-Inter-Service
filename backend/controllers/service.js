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

  const { name, description } = req.body;

  const service = new Service({
    name: name,
    description: description
  })

  service.save()
    .then((response) => res.status(201).json({ message: 'Service créé !', service: response }))
    .catch(error => res.status(400).json({ error }));

}

exports.deleteService = (req, res, next) => {
  const id = req.params.id;

  sequelize.transaction(async (transaction) => {
    await User.destroy({ where: { service_id: id }, transaction });
    await Timeline.destroy({ where: { service_id: id }, transaction });
    await Service.destroy({ where: { id: id }, transaction });

    const folderPath = `images/services/service${id}`;
    if (fs.existsSync(folderPath)) fs.rmdirSync(folderPath, { recursive: true });

    res.status(201).json({ message: 'Service supprimé !' });
  })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
};

exports.updateService = (req, res, next) => {
  const id = req.params.id;
  const { name, description } = req.body;

  Service.findOne({ where: { id: id } })
    .then(service => {
      if (!service) {
        return res.status(404).json({ message: 'Service non trouvé' });
      }

      let oldImage = service.image;

      if (req.file) {
        const newImage = req.file.filename;
        service.image = newImage;
        const folderPath = `images/services/service${id}/${oldImage}`;
        if (fs.existsSync(folderPath)) fs.unlink(folderPath, (err) => { });
      }

      service.name = name;
      service.description = description;

      return service.save();
    })
    .then(() => res.status(200).json({ message: 'Service modifié !', image: req.file ? req.file.filename : null }))
    .catch(error => res.status(500).json({ error }));
}