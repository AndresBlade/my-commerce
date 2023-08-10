import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import getClientID from "../utils/getClientID";

import {createPurchase,
        getPurchaseByUser
} from '../controllers/Ventas'

const router = express.Router();



router.post('/createPurchese', 
            authMiddleware,
            checkRole(['CLIENTE']),
            createPurchase
            );

router.get('/getPurchaseByUser',
            authMiddleware,
            checkRole(['CLIENTE']),
            getPurchaseByUser);


module.exports = router;