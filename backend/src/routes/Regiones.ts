import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getRegions,
        getAllTiendasOfARegion,
        createRegion,
        editRegion
} from '../controllers/Regiones'

const router = express.Router();

router.get('/getRegions', 
            authMiddleware,
            checkRole(['CLIENTE', 'ADMINISTRADOR']),
            getRegions);

router.get('/getAllTiendasOfARegion/:regionID',
            getAllTiendasOfARegion);

router.post('/createRegion', 
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            createRegion);

router.put('/editRegion',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            editRegion);

module.exports = router;