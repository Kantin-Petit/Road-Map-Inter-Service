const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/timeline');

router.get('/', serviceCtrl.getAllTimelines);
router.post('/filter', serviceCtrl.getFilteredTimelines);

module.exports = router;