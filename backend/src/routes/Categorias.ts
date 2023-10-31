import express from 'express';
import {authMiddleware} from '../middleware/session';
import checkRole from '../middleware/checkRole';
import {getCategories,
        createCategory,
        editCategory
} from '../controllers/Categorias'

const router = express.Router();

router.get('/getCategories', 
            getCategories);

router.post('/createCategory',
            authMiddleware,
            checkRole(['ADMINISTRADOR']),
            createCategory);


router.post('/editCategory/:categoryID',
        authMiddleware,
        checkRole(['ADMINISTRADOR']),
        editCategory);


module.exports = router;