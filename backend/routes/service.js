const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');

router.get('/', serviceCtrl.getAllservices);
router.get('/:id', serviceCtrl.getOneservice);
// router.get('/', serviceCtrl.getAllservices);
// router.post('/filter', serviceCtrl.getFilteredServices);
// router.post('/service', serviceCtrl.addService);
// router.put('/service', serviceCtrl.modifyService);
// router.delete('/service', serviceCtrl.deleteService);

module.exports = router;