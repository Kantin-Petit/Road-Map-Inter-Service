const express = require('express');
const router = express.Router();
const thematicTimelineCtrl = require('../controllers/thematicTimeline');

router.get('/:id', thematicTimelineCtrl.getAssociation);
router.post('/', thematicTimelineCtrl.createAssociation);
router.delete('/all/:type/:id', thematicTimelineCtrl.deleteAllAssociations);
router.delete('/:timelineId/:thematicId', thematicTimelineCtrl.deleteAssociation);

module.exports = router;