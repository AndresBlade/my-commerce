const express = require('express');
const router = express.Router();
const productModel = require('../controllers/productoController');
const {validatorRegisterProducto} = require('../validators/productoValidator');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');
const customParam = require('../middleware/customParams');
const uploadMiddleware = require('../utils/handleStorage');

router.post('/createProduct',
            authMiddleware,
            checkRole(['TIENDA']),
            customParam('tiendaProducts'),
            uploadMiddleware.array('imagen'),
            validatorRegisterProducto,
            productModel.createProduct);

router.get('/getProducts', 
            productModel.getProducts);

router.get('/getProductsByTienda/:rif', 
            productModel.getProductsByTienda);

router.get('/getProductByCategory/:categoryID', 
            productModel.getProductByCategory);

router.get('/getProductsByName/:name',
            productModel.getProductsByName);

router.get('/getProductByID/:id', 
            productModel.getProductByID);


module.exports = router;
