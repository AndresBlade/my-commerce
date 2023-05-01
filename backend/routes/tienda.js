const express = require('express');
const router = express.Router();
const tienda = require('../controllers/tiendaControl');
const {validatorRegisterTienda} = require('../validators/tiendaValidator');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');

router.get('/tienda/:name',
            authMiddleware,
            checkRole(['CLIENTE']),
            tienda.getTiendaByName);

router.get('/tiendas',
            authMiddleware,
            checkRole(['CLIENTE']),
            tienda.getTiendas);

router.post('/register', 
            authMiddleware,
            checkRole(['CLIENTE']),
            validatorRegisterTienda,
            tienda.createTienda);

module.exports = router;