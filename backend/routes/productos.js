const express = require('express');
const router = express.Router();
const producto = require('../controllers/productoController');
const {validatorRegisterTienda} = require('../validators/tiendaValidator');
const authMiddleware = require('../middleware/session');
const checkRole = require('../middleware/rol');
const uploadMiddleware = require('../utils/handleStorage');

router.get('/productos',
            authMiddleware,
            checkRole(['TIENDA']),
            //productoUpload.fields([{name: 'imagen', maxCount: 1}]),
            producto.createTienda);

module.exports = router;
