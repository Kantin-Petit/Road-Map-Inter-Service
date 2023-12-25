const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/subject');

router.get('/', serviceCtrl.getAllSubjects);
router.get('/filter/', serviceCtrl.getFilteredSubjects);

module.exports = router;