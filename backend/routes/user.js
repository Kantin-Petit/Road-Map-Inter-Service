const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth')

router.get('/service/:id', userCtrl.getAllUsersFromService);
router.get('/:id', userCtrl.getOneUser);
router.get('/', userCtrl.getAllUsers);
router.put('/:id', userCtrl.modifyUser);
router.delete('/:id', userCtrl.deleteUser);

module.exports = router;