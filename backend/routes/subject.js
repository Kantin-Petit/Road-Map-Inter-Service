const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/subject');

router.get('/allsubject', serviceCtrl.allSubjects);
router.get('/filteredsubject', serviceCtrl.filteredSubjects);

module.exports = router;