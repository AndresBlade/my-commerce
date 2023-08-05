import express from 'express';
import {CreateProduct } from "../controllers/Productos";
import {authMiddleware} from '../middleware/session';
import validatorRegisterProduct from '../validators/ProductoValidator';
import uploadMiddleware from '../utils/handleStorage';
import imageRoute from "../middleware/imagenRoute";
import checkRole from '../middleware/checkRole';
import CheckTiendasPerClient from '../middleware/checkTiendasClient';

const router = express.Router();

router.post("/createProduct", 
            authMiddleware,
            checkRole(['CLIENTE']),
            CheckTiendasPerClient,
            imageRoute('tiendaProducts'),
            uploadMiddleware.array('Imagenes'),
            // validatorRegisterProduct,
            CreateProduct);



module.exports = router;

