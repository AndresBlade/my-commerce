import { Request, Response} from "express";
import express from 'express';
import { registerUser, 
        getUsuario, 
        loginUser,
        updateUserImage, 
    } from "../controllers/Usuarios";
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import imagenRoute from '../middleware/imagenRoute';
import uploadMiddleware from "../utils/handleStorage";

const router = express.Router();

router.post("/registerUser",
            registerUser);

router.get('/getUsuarios',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            getUsuario
);

router.get('/loginUser',
            loginUser)


router.put('/updateUserImage',
            authMiddleware,
            checkRole(['CLIENTE']),
            imagenRoute('userProfile'),
            uploadMiddleware.single('imagen'),
            updateUserImage
            );
module.exports = router;

