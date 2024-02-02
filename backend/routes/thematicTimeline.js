const express = require('express');
const router = express.Router();
const thematicTimelineCtrl = require('../controllers/thematicTimeline');

router.get('/:id', thematicTimelineCtrl.getAssociation);

module.exports = router;