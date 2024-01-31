const express = require('express');
const router = express.Router();
const thematicCtrl = require('../controllers/thematic');

router.get('/', thematicCtrl.getAllThematics);
router.get('/:id', thematicCtrl.getOneThematic);
router.post('/', thematicCtrl.createThematic);
router.put('/:id', thematicCtrl.updateThematic);
router.delete('/:id', thematicCtrl.deleteThematic);

module.exports = router;