const express = require('express');
const router = express.Router();
const timelineCtrl = require('../controllers/timeline');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/list', auth, timelineCtrl.getListTimelines);
router.get('/', timelineCtrl.getAllTimelines);
router.post('/filter', timelineCtrl.getFilteredTimelines);
router.post('/', auth, multer, timelineCtrl.createTimeline);
router.put('/:id', auth, multer, timelineCtrl.updateTimeline);
router.delete('/:id', auth, timelineCtrl.deleteTimeline);

module.exports = router;