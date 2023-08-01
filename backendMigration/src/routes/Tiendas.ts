import { Request, Response} from "express";
import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import validatorRegisterTienda from '../validators/TiendaValidator';
import uploadMiddleware from '../utils/handleStorage';
import imageRoute from "../middleware/imagenRoute";

import { tiendaRegister,
         getTiendaByRIF,
         getTiendaByClient,
         getTiendaByName, 
         getTiendas} from "../controllers/Tiendas";

const router = express.Router();


router.get('/getTiendas:page?/:size?', 
            getTiendas);

router.get('/getTiendaByName/:tiendaName', 
            getTiendaByName);

router.get('/getTiendaByRIF/:tiendaRIF', 
            getTiendaByRIF);

router.get('/getTiendaByClient/:clientID', 
            getTiendaByClient);

router.post("/tiendaRegister",
            authMiddleware,
            checkRole(['CLIENTE']),
            imageRoute('tiendaProfile'),
            uploadMiddleware.single('imagen'),
            validatorRegisterTienda,
            tiendaRegister);

module.exports = router;




