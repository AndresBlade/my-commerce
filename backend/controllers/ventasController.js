const { matchedData } = require('express-validator');
const { productoModel } = require('../models');
const { ventasCabeceraModel } = require('../models');
const { ventasDetalleModel} = require('../models');
const {ventas_Tiendas} = require('../models');
const {handleHttpErros} = require('../utils/handleErrors');


const individualPurchase = async (req, res) => {
    try{
        //inicialización de variables
        const userData = req.user.dataValues;
        const ventaDetalle = req.body;

        //envia los datos de la venta y los datos del usuario a la tabla de ventas_detlle
        const venta = await ventasDetalleModel.create(ventaDetalle);

        //construimos un objeto con los datos de la venta y el id del usuario para enviarlo a la tabla de ventas_cabecera
         const dataVentaCabecera = {
             ventas_detalles_id: venta.id,
             cliente_id: userData.id,
        }
        const ventaCabecera = await ventasCabeceraModel.create(dataVentaCabecera);

        //conseguimos el producto que se vendio
        const {dataValues} = await productoModel.FindProductAndTienda(ventaDetalle.producto_id);

        //construimos un objeto con los datos de la tienda y el id de la venta para enviarlo a la tabla de ventas_tiendas
        const dataTiendaVentas = {
            tienda_id: dataValues.tienda.RIF,
            venta_cabecera_id: ventaCabecera.id,
        }
        const ventaTienda = await ventas_Tiendas.create(dataTiendaVentas);

        res.send({ventaRealizada: venta,
                  idVenta: ventaCabecera.id,
                  ventaTienda: ventaTienda});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CREATE_PURCHASE');
    }
}


const getPurchasesByUser = async (req, res) => {
    try{
        const userData = req.user.dataValues;
        const {id} = req.params;

        const compras = await ventasCabeceraModel.findPurchasesByUser(id);

        res.send(compras);

    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_PURCHASES_BY_USER');
    }
}   

const getSellsByTienda = async (req, res) => {
    try{
        console.log('Hola')
        const {RIF} = req.params;

        console.log('Hola')

        const ventas = await ventas_Tiendas.findSellsByTienda(RIF);
        console.log('Hola')

        res.send(ventas);
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_GET_SELLS_BY_TIENDA');
    }
}


module.exports = {individualPurchase, getPurchasesByUser, getSellsByTienda};