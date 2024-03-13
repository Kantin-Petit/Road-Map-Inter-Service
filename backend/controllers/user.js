const User = require('../models/User');
const Service = require('../models/Service');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res, next) => {

  let serviceID

  if (req.auth.userRole === 'admin_service') { serviceID = { service_id: req.auth.userServiceId } }
  else if (req.auth.userRole === 'admin') { serviceID = '' }
  else return res.send([]);

  User.findAll({
    where: serviceID,
    attributes: { exclude: ['password'] },
    include: [{
      model: Service,
      attributes: ['name']
    }]
  })
    .then(users => res.send(users))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {

  User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: req.params.id },
    include: [{
      model: Service,
      attributes: ['name']
    }]
  })
    .then(user => {

      if (req.auth.userRole === 'admin_service') {
        if (user.dataValues.service_id != req.auth.userServiceId) throw new Error('Access denied');
        res.send(user)
      }
      else if (req.auth.userRole === 'user') {
        if (user.dataValues.id != req.auth.userId) throw new Error('Access denied');
        res.send(user)
      }
      else if (req.auth.userRole === 'admin') { res.send(user) }
      else throw new Error('Access denied');

    })
    .catch(error => res.status(500).json({ error }));
};

exports.modifyUser = (req, res, next) => {

  User.findOne({ where: { id: req.params.id } })
    .then(user => {

      const service = req.body.role === 'admin' ? null : Number(req.body.service_id);

      if (req.auth.userRole === 'admin_service') {
        if (user.dataValues.service_id != req.auth.userServiceId) throw new Error('Access denied');
      }
      else if (req.auth.userRole === 'user') {
        if (user.dataValues.id != req.auth.userId) throw new Error('Access denied');
      }
      else if (req.auth.userRole !== 'admin') { throw new Error('Access denied'); }

      user.first_name = req.body.first_name
      user.last_name = req.body.last_name
      user.email = req.body.email
      user.service_id = service
      user.role = req.body.role

      if (req.body.password) {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => {
            user.password = hash;
            user.save()
              .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
              .catch(error => res.status(400).json({ error }));
          })
      }

      if (!req.body.password) {
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur modifié !' }))
          .catch(error => res.status(400).json({ error }));
      }
    })
    .catch(error => res.status(500).json({ error }));
};


exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then(user => {

      if (req.auth.userRole === 'admin_service') {
        if (user.dataValues.service_id != req.auth.userServiceId) throw new Error('Access denied');
      }
      else if (req.auth.userRole !== 'admin') { throw new Error('Access denied'); }

      user.destroy()
        .then(() => res.status(201).json({ message: 'Utilisateur supprimé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};