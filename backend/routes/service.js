const express = require('express');
const router = express.Router();
const serviceCtrl = require('../controllers/service');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

router.get('/', auth, serviceCtrl.getAllServices);
router.get('/:id',auth, serviceCtrl.getOneService);
router.post('/', auth, multer, serviceCtrl.createService);
router.put('/:id',auth, multer, serviceCtrl.updateService);
router.delete('/:id', auth, serviceCtrl.deleteService);

module.exports = router;