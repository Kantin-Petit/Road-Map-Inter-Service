const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');
const multer = require('../middleware/multer-config');

router.get('/', serviceCtrl.getAllServices);
router.get('/:id', serviceCtrl.getOneService);
router.post('/', multer, serviceCtrl.createService);
router.put('/:id', multer, serviceCtrl.updateService);
router.delete('/:id', serviceCtrl.deleteService);

module.exports = router;