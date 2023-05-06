const express = require('express');
const router = express.Router();
const users = require('../controllers/usersControl');
const { validatorLoginUser, validatorRegisterUser } = require('../validators/UserValidator');
const uploadMiddleware = require('../utils/handleStorage');
const customParam = require('../middleware/customParams');


router.post('/login', validatorLoginUser, users.loginUser);
router.get('/users/:id', users.getUsersById);
router.get('/users', users.getUsers);
router.post('/register', 
            customParam('userProfile'),
            uploadMiddleware.single('imagen'),
            validatorRegisterUser, 
            users.createUser);

module.exports = router;