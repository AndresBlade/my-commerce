import express from 'express';
import {authMiddleware} from '../middleware/session';
import {ValidatorRegisterProduct, ValidatorUpdatedProduct} from '../validators/ProductoValidator';
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
        deleProduct,
        updateProduct,
} from "../controllers/Productos";


const router = express.Router();


router.post("/createProduct", 
            authMiddleware,
            checkRole(['CLIENTE']),
            CheckTiendasPerClient,
            imageRoute('tiendaProducts'),
            uploadMiddleware.array('Imagenes'),
            ValidatorRegisterProduct,
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


router.put('/deleteProduct/:productId',
            authMiddleware,
            checkRole(['CLIENTE']),
            deleProduct);


router.put('/updateProduct/:productId',
            authMiddleware,
            checkRole(['CLIENTE']),
            imageRoute('tiendaProducts'),
            uploadMiddleware.array('Imagenes'),
            ValidatorUpdatedProduct,
            updateProduct);


module.exports = router;

