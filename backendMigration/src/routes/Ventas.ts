import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {createPurchase,
} from '../controllers/Ventas'

const router = express.Router();



router.get('/createPurchese', 
            authMiddleware,
            checkRole(['CLIENTE']),
            createPurchase
            );


module.exports = router;