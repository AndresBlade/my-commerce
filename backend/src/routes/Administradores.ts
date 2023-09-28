import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getTiendasOnStandby,
} from '../controllers/Administradores'
import {adminPrivilige} from '../middleware/adminPrivilige';

const router = express.Router();


router.get("/getTiendasOnStandby/:page?/:size?",
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['MEDIO', 'ALTO']),
            getTiendasOnStandby
)

module.exports = router;