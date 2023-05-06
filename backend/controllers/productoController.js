const { matchedData } = require('express-validator');
const { productoModel } = require('../models');
const {handleHttpErros} = require('../utils/handleErrors');


const createTienda = async (req, res) => {
    console.log('Hello world from createTienda');
}

module.exports = {createTienda};