import { Request, Response} from "express";
import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getRegions,
        getAllTiendasOfARegion
} from '../controllers/Regiones'

const router = express.Router();



router.get('/getRegions', 
            authMiddleware,
            checkRole(['CLIENTE']),
            getRegions);

router.get('/getAllTiendasOfARegion/:regionID',
            getAllTiendasOfARegion);

module.exports = router;