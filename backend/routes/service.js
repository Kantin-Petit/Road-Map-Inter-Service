const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');

router.get('/allservice', serviceCtrl.allService);
router.get('/service/:fileName', serviceCtrl.service);
router.get('/servicesname', serviceCtrl.getAllServiceName);
router.get('/servicefiltered', serviceCtrl.servicesFiltered);
// router.post('/service', serviceCtrl.addService);
// router.put('/service', serviceCtrl.modifyService);
// router.delete('/service', serviceCtrl.deleteService);

module.exports = router;