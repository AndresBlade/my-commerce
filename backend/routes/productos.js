const express = require('express');
const router = express.Router();
const producto = require('../controllers/productoController');
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
            producto.createProduct);

router.get('/getProducts', producto.getProducts);

router.get('/getProductsByTienda/:rif', 
            producto.getProductsByTienda);

router.get('/getProductByCategory/:categoryID', 
            producto.getProductByCategory);

module.exports = router;
