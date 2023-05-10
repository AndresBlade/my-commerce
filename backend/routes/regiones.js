const express = require('express');
const router = express.Router();
const categoryModule = require('../models/categorias');

router.get('/getRegions',async (req, res) => {
    try{
        const regiones = await categoryModule.findAll();
        res.send({regiones});
    }
    catch(e){
        console.log(e);
        res.status(500).send({message: 'ERROR_GET_REGIONS'});
    }
}); 

module.exports = router;