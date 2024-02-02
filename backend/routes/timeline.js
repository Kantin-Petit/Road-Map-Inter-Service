const express = require('express');
const router = express.Router();
const timelineCtrl = require('../controllers/timeline');

router.get('/', timelineCtrl.getAllTimelines);
router.get('/:id', timelineCtrl.getOneTimeline);
router.post('/filter', timelineCtrl.getFilteredTimelines);
router.post('/list', timelineCtrl.getListTimelines);
router.post('/', timelineCtrl.createTimeline);
router.put('/:id', timelineCtrl.updateTimeline);
router.delete('/:id', timelineCtrl.deleteTimeline);

module.exports = router;