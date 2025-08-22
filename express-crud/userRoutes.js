const express = require('express');
const router = express.Router();
const userController = require('.userController');

// CRUD routes
router.post('/', userController.createUser);
router.get('/siswa', userController.getUsers);
// router.get('/:id', userController.getUserByKode);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
