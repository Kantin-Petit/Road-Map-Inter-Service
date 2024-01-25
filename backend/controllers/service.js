const Service = require('../models/Service');

// const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');


exports.getAllservices = (req, res, next) => {

  Service.findAll()
    .then(services => res.send(services))
    .catch(error => res.status(500).json({ error }));

};

exports.getOneservice = (req, res, next) => {

  Service.findOne({ where: { id: req.params.id } })
    .then(service => res.send(service))
    .catch(error => res.status(500).json({ error }));

};

exports.getAllTimelines = (req, res, next) => {

  Service.findOne({ where: { id: req.params.id } })
    .then(service => res.send(service))
    .catch(error => res.status(500).json({ error }));

};