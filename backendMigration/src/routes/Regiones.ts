import { Request, Response} from "express";
import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getRegions} from '../controllers/Regiones'

const router = express.Router();



router.get('/getRegions', 
            authMiddleware,
            checkRole(['CLIENTE']),
            getRegions);

module.exports = router;