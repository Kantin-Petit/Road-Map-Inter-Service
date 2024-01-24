const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/thematic');

router.get('/', serviceCtrl.getAllThematics);
router.get('/:name', serviceCtrl.getOneThematic);
router.post('/', serviceCtrl.createThematic);
router.put('/:id', serviceCtrl.updateThematic);
router.delete('/:id', serviceCtrl.deleteThematic);

module.exports = router;