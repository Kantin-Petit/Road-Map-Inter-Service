const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/subject');

router.get('/', serviceCtrl.getAllSubjects);

module.exports = router;