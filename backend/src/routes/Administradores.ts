import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getTiendasOnStandby,
        acceptTiendaOnStandby,
        rejectTiendaOnStandby,
        getTiendasRejected,
} from '../controllers/Administradores'
import {adminPrivilige} from '../middleware/adminPrivilige';

const router = express.Router();


router.get("/getTiendasOnStandby/:page?/:size?",
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['MEDIO', 'ALTO']),
            getTiendasOnStandby
);


router.get("/getTiendasRejected/:page?/:size?",
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['MEDIO', 'ALTO']),
            getTiendasRejected
);


router.put("/acceptTiendaOnStandby/:tiendaRIF",
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['MEDIO', 'ALTO']),
            acceptTiendaOnStandby
);


router.put("/rejectTiendaOnStandby/:tiendaRIF",
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            adminPrivilige(['MEDIO', 'ALTO']),
            rejectTiendaOnStandby
);




module.exports = router;