const Thematic = require('../models/Thematic');

exports.getAllThematics = (req, res, next) => {
  Thematic.findAll()
    .then(thematics => res.send(thematics))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneThematic = (req, res, next) => {
  Thematic.findOne({ where: { id: req.params.id } })
    .then(thematic => res.send(thematic))
    .catch(error => res.status(500).json({ error }));
}

exports.createThematic = (req, res, next) => {

  if (!(req.auth.userRole === 'admin' || req.auth.userRole === 'admin_service')) return

  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color ? req.body.color : '#000000';

  const thematic = new Thematic({
    name: name,
    description: description,
    color: color
  })

  thematic.save()
    .then((response) => res.status(201).json({ message: 'Thématique créé !', thematic: response }))
    .catch(error => res.status(400).json({ error }));

}


exports.deleteThematic = (req, res, next) => {

  if (!(req.auth.userRole === 'admin' || req.auth.userRole === 'admin_service')) return

  const id = req.params.id;

  Thematic.findOne({ where: { id: id } })
    .then(thematic => {
      thematic.destroy()
        .then(() => res.status(201).json({ message: 'Thematic supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

}

exports.updateThematic = (req, res, next) => {

  if (!(req.auth.userRole === 'admin' || req.auth.userRole === 'admin_service')) return

  const id = req.params.id;
  const name = req.body.name;
  const description = req.body.description;
  const color = req.body.color ? req.body.color : '#000000';

  Thematic.findOne({ where: { id: id } })
    .then(thematic => {
      thematic.update({
        name: name,
        description: description,
        color: color
      })
        .then(() => res.status(201).json({ message: 'Thématique modifié !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
}