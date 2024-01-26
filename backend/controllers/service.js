const Service = require('../models/Service');

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
  const image = req.body.name;
  const description = req.body.description;

  const service = new Service({
    name: name,
    description: image,
    description: description
  })

  service.save()
    .then(() => res.status(201).json({ message: 'Service créé !' }))
    .catch(error => res.status(400).json({ error }));

}


exports.deleteService = (req, res, next) => {

  const id = req.params.id;

  Service.findOne({ where: { id: id } })
    .then(service => {
      service.destroy()
        .then(() => res.status(201).json({ message: 'Service supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}

exports.updateService = (req, res, next) => {

  const id = req.params.id;
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;

  Service.findOne({ where: { id: id } })
    .then(service => {
      service.update({
        name: name,
        description: image,
        description: description
      })
        .then(() => res.status(201).json({ message: 'Service modifié !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}