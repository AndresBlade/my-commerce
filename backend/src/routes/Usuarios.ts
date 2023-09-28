import express from 'express';
import {
	registerUser,
	updateUserPassword,
	getUsuario,
	loginUser,
	updateUserImage,
	registerAdmin,
	updateUserName,
	updateUserEmail,
	desactivateUser,
} from '../controllers/Usuarios';
import { authMiddleware } from '../middleware/session';
import checkRole from '../middleware/checkRole';
import { adminPrivilige } from '../middleware/adminPrivilige';
import imagenRoute from '../middleware/imagenRoute';
import uploadMiddleware from '../utils/handleStorage';

const router = express.Router();

router.post('/registerUser', registerUser);

router.get(
	'/getUsuarios',
	authMiddleware,
	checkRole(['ADMINISTRADOR']),
	getUsuario
);


router.post('/loginUser', loginUser);


router.post(
	'/registerAdmin',
	authMiddleware,
	checkRole(['ADMINISTRADOR']),
	adminPrivilige(['ALTO']),
	registerAdmin
);


//Edicion
router.put(
	'/updateUserImage',
	authMiddleware,
	checkRole(['CLIENTE', 'ADMINISTRADOR']),
	imagenRoute('userProfile'),
	uploadMiddleware.single('imagen'),
	updateUserImage
);

router.put(
	'/updateUserPassword',
	authMiddleware,
	checkRole(['CLIENTE', 'ADMINISTRADOR']),
	updateUserPassword
);

router.put(
	'/updateUserName',
	authMiddleware,
	checkRole(['CLIENTE', 'ADMINISTRADOR']),
	updateUserName
);


router.put(
	'/updateUserEmail',
	authMiddleware,
	checkRole(['CLIENTE']),
	updateUserEmail	
);

router.put(
	'/desactivateUser',
	authMiddleware,
	checkRole(['CLIENTE']),
	desactivateUser	
);

module.exports = router;
