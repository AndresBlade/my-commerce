import { Request, Response} from "express";
import express from 'express';
import { registerUser, 
        getUsuario, 
        loginUser,
        updateUserImage, 
        registerAdmin,
    } from "../controllers/Usuarios";
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import { adminPrivilige } from "../middleware/adminPrivilige";
import imagenRoute from '../middleware/imagenRoute';
import uploadMiddleware from "../utils/handleStorage";

const router = express.Router();

router.post("/registerUser",
            registerUser
);

router.get('/getUsuarios',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            getUsuario
);

router.get('/loginUser',
            loginUser
);

router.put('/updateUserImage',
            authMiddleware,
            checkRole(['CLIENTE']),
            imagenRoute('userProfile'),
            uploadMiddleware.single('imagen'),
            updateUserImage
);

router.post('/registerAdmin',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['ALTO']),
            registerAdmin,
);

module.exports = router;

