const express = require('express');
const router = express.Router();
const users = require('../controllers/usersControl');
const { validatorLoginUser, validatorRegisterUser } = require('../validators/UserValidator');
const uploadMiddleware = require('../utils/handleStorage');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');
const customParam = require('../middleware/customParams');


router.post('/login', 
            validatorLoginUser, 
            users.loginUser);

router.post('/register',
            validatorRegisterUser, 
            users.createUser);


/******************************* */
router.get('/users/:id',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            users.getUsersById);

router.get('/users', 
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            users.getUsers);
/******************************* */

router.put('/editar/:id', 
            authMiddleware,
            checkRole(['CLIENTE']),
            validatorRegisterUser,
            users.editProfile);


router.put('/editarImagen/:id',
            authMiddleware,
            checkRole(['CLIENTE']),
            customParam('userProfile'),
            uploadMiddleware.single('imagen'),
            users.editUserImagen);


module.exports = router;