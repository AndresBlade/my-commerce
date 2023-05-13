const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const { ventas_detalles_validator } = require('../validators/purchaseValidator');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');


router.post('/individualPurchase',
            authMiddleware,
            checkRole(['CLIENTE','TIENDA']),
            ventas_detalles_validator,
            ventasController.individualPurchase);


module.exports = router;