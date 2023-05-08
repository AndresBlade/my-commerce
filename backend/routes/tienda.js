const express = require('express');
const router = express.Router();
const tienda = require('../controllers/tiendaControl');
const {validatorRegisterTienda} = require('../validators/tiendaValidator');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');
const uploadMiddleware = require('../utils/handleStorage');
const customParam = require('../middleware/customParams');

router.get('/tienda/:name',
            tienda.getTiendaByName);


router.get('/tiendas',
            tienda.getTiendas);


router.post('/register', 
            authMiddleware,
            checkRole(['CLIENTE']),
            customParam('tiendaProfile'),
            uploadMiddleware.single('imagen'),
            validatorRegisterTienda,
            tienda.createTienda);

router.get('/getTiendasByUser/:id', 
            authMiddleware,
            checkRole(['TIENDA']),
            tienda.getTiendasByUser);


module.exports = router;