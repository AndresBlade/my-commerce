const express = require('express');
const router = express.Router();
const categoryModule = require('../models/categorias');

router.get('/getCategories',async (req, res) => {
    try{
        const categories = await categoryModule.findAll();
        res.send({categories});
    }
    catch(e){
        console.log(e);
        res.status(500).send({message: 'Error en el servidor'});
    }
}); 

module.exports = router;