const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');

router.get('/filter', serviceCtrl.getFilteredServices);
router.get('/:name', serviceCtrl.getOneservice);
router.get('/', serviceCtrl.getAllservices);
// router.post('/service', serviceCtrl.addService);
// router.put('/service', serviceCtrl.modifyService);
// router.delete('/service', serviceCtrl.deleteService);

module.exports = router;