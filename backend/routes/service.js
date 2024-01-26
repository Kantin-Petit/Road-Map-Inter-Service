const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');

router.get('/', serviceCtrl.getAllServices);
router.get('/:id', serviceCtrl.getOneService);
router.post('/', serviceCtrl.createService);
router.put('/:id', serviceCtrl.updateService);
router.delete('/:id', serviceCtrl.deleteService);

module.exports = router;