import express from 'express';
import {
	registerUser,
	updateUserPassword,
	getUsuario,
	loginUser,
	updateUserImage,
	registerAdmin,
	updateUserName,
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
	checkRole(['CLIENTE']),
	imagenRoute('userProfile'),
	uploadMiddleware.single('imagen'),
	updateUserImage
);

router.put(
	'/updateUserPassword',
	authMiddleware,
	checkRole(['CLIENTE']),
	updateUserPassword
);

router.put(
	'/updateUserName',
	authMiddleware,
	checkRole(['CLIENTE']),
	updateUserName
);

module.exports = router;
