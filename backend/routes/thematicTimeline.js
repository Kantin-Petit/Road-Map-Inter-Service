const express = require('express');
const router = express.Router();
const thematicTimelineCtrl = require('../controllers/thematicTimeline');
const auth = require('../middleware/auth');

router.get('/:id', thematicTimelineCtrl.getAssociation);
router.post('/', thematicTimelineCtrl.createAssociation);
router.delete('/:timelineId/:thematicId', thematicTimelineCtrl.deleteAssociation);

module.exports = router;