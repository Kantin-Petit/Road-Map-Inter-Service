const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config')
const auth = require('../middleware/auth')

// router.get('/',auth, userCtrl.getAllUsers);
router.get('/', userCtrl.getAllUsers);
// router.get('/:id',auth, userCtrl.getOneUser);
router.get('/:id', userCtrl.getOneUser);
router.put('/active/:id',auth, userCtrl.makeAdmin); 
router.put('/:id',auth, userCtrl.modifyUser);
// router.delete('/:id',auth, userCtrl.deleteUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;