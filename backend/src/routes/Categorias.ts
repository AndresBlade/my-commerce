import express from 'express';
import {getCategories,
} from '../controllers/Categorias'

const router = express.Router();

router.get('/getCategories', 
            getCategories);


module.exports = router;