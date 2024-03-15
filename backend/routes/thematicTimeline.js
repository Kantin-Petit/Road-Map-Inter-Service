const express = require('express');
const router = express.Router();
const thematicTimelineCtrl = require('../controllers/thematicTimeline');
const auth = require('../middleware/auth');

router.post('/', auth, thematicTimelineCtrl.createAssociation);
router.delete('/:timelineId/:thematicId', auth, thematicTimelineCtrl.deleteAssociation);

module.exports = router;