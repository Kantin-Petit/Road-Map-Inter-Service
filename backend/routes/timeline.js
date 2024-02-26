const express = require('express');
const router = express.Router();
const timelineCtrl = require('../controllers/timeline');
const multer = require('../middleware/multer-config');

router.get('/', timelineCtrl.getAllTimelines);
router.get('/:id', timelineCtrl.getOneTimeline);
router.post('/filter', timelineCtrl.getFilteredTimelines);
router.post('/list', timelineCtrl.getListTimelines);
router.post('/', multer, timelineCtrl.createTimeline);
router.put('/:id', multer, timelineCtrl.updateTimeline);
router.delete('/:id/:service_id', timelineCtrl.deleteTimeline);

module.exports = router;