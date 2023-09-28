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
         getTiendas,
         deleteTienda,
         updateTiendaImagen,
         updateTiendaData} from "../controllers/Tiendas";

const router = express.Router();


router.get('/getTiendas/:page?/:size?', 
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
            tiendaRegister,
            );

router.put("/deleteTienda/:tiendaRIF",
            authMiddleware,
            checkRole(['CLIENTE']),
            deleteTienda,
            );

router.put("/updateTiendaImagen/:tiendaRIF",
            authMiddleware,
            checkRole(['CLIENTE']),
            imageRoute('tiendaProfile'),
            uploadMiddleware.single('imagen'),
            updateTiendaImagen,
            );

router.put("/updateTiendaData",
            authMiddleware,
            checkRole(['CLIENTE']),
            imageRoute('tiendaProfile'),
            uploadMiddleware.single('imagen'),
            validatorRegisterTienda,
            updateTiendaData,
            );


module.exports = router;




