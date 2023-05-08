const { matchedData } = require('express-validator');
const { productoModel } = require('../models');
const {handleHttpErros} = require('../utils/handleErrors');


const createProduct = async (req, res) => {
    try{
        req = matchedData(req);
        console.log(req);
        req.imagenes = req.imagen.trim();
        console.log(req.imagenes)

        const dataTienda = await productoModel.create(req);

        res.send({dataTienda});
    }
    catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CREATE_PRODUCTS');
    }
}

const getProductsByTienda = async (req, res) => {
    try{
        const {rif} = req.params;   
        const tiendaProducts = await productoModel.FindProductsByTienda(rif);
        res.send({tiendaProducts});
    }
    catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_PRODUCTS_BY_TIENDA');
    }
}

const getProducts = async (req, res) => {
    try{
        const allProducts = await productoModel.findAllProducts();

        res.send({allProducts});
    }
    catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_PRODUCTS');
    }
}

const getProductByCategory = async (req, res) => {
    try{
        const {categoryID} = req.params;   
        const tiendaProducts = await productoModel.findProductsByCategory(categoryID);
        res.send({ProductsByCategory});
    }
    catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_PRODUCTS_BY_CATEGORY');
    }
}

const getProductsByName = async (req, res) => {
    try{
        const {name} = req.params;   
        const productsByName = await productoModel.findProductsByName(name);
        res.send({productsByName});
    }
    catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_PRODUCTS_BY_NAME');
    }
}


module.exports = {createProduct, getProductsByTienda, getProducts,getProductByCategory, getProductsByName };