import { Request, Response} from "express";
import express from 'express';
import { tiendaRegister } from "../controllers/Tiendas";
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import validatorRegisterTienda from '../validators/TiendaValidator';
import uploadMiddleware from '../utils/handleStorage';
import imageRoute from "../middleware/imagenRoute";

const router = express.Router();

router.post("/tiendaRegister",
            authMiddleware,
            checkRole(['CLIENTE']),
            imageRoute('tiendaProfile'),
            uploadMiddleware.single('imagen'),
            validatorRegisterTienda,
            tiendaRegister);


module.exports = router;




