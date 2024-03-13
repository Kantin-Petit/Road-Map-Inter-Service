const express = require('express');
const router = express.Router();
const thematicCtrl = require('../controllers/thematic');
const auth = require('../middleware/auth');

router.get('/', thematicCtrl.getAllThematics);
router.get('/:id', thematicCtrl.getOneThematic);
router.post('/', auth, thematicCtrl.createThematic);
router.put('/:id', auth, thematicCtrl.updateThematic);
router.delete('/:id', auth, thematicCtrl.deleteThematic);

module.exports = router;