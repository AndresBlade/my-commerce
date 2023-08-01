import { Request, Response} from "express";
import express from 'express';
import { registerUser, getUsuario, loginUser } from "../controllers/Usuarios";
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';

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

module.exports = router;

