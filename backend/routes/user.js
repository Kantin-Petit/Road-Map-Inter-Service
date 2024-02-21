const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

// router.get('/:id',auth, userCtrl.getOneUser);
router.get('/service/:id', userCtrl.getAllUsersFromService);
router.get('/:id', userCtrl.getOneUser);
// router.get('/',auth, userCtrl.getAllUsers);
router.get('/', userCtrl.getAllUsers);
// router.put('/:id',auth, userCtrl.modifyUser);
router.put('/:id', userCtrl.modifyUser);
// router.delete('/:id',auth, userCtrl.deleteUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;