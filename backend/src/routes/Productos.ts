import express from 'express';
import {authMiddleware} from '../middleware/session';
import validatorRegisterProduct from '../validators/ProductoValidator';
import uploadMiddleware from '../utils/handleStorage';
import imageRoute from "../middleware/imagenRoute";
import checkRole from '../middleware/checkRole';
import CheckTiendasPerClient from '../middleware/checkTiendasClient';
import {CreateProduct,
        getProductByTiendaRIF,
        getProductByName,
        getProductByID,
        getAllProducts,
        getAllProductsByCategoria,
} from "../controllers/Productos";

const router = express.Router();

router.post("/createProduct", 
            authMiddleware,
            checkRole(['CLIENTE']),
            CheckTiendasPerClient,
            imageRoute('tiendaProducts'),
            uploadMiddleware.array('Imagenes'),
            validatorRegisterProduct,
            CreateProduct);

router.get("/getProductsByTienda/:tiendaRif", 
            getProductByTiendaRIF);

router.get('/getProductByName/:productName', 
            getProductByName);

router.get('/getProductById/:productId', 
            getProductByID);

router.get('/getAllProducts', 
            getAllProducts);

router.get('/getAllProductsByCategoria', 
            getAllProductsByCategoria);


module.exports = router;

