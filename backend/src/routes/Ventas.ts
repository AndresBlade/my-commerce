import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';

import {createPurchase,
        getPurchaseByUser,
        getProductsSoldByStore,
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
            getPurchaseByUser
);


router.get('/productsSoldByStore/:id',
            authMiddleware,
            checkRole(['CLIENTE']),
            getProductsSoldByStore
);


module.exports = router;