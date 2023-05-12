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


        const dataTiendaVentas = {
            tienda_id: dataValues.tienda.RIF,
            venta_cabecera_id: ventaCabecera.id,
        }
        const ventaTienda = await ventas_Tiendas.create(dataTiendaVentas);

        console.log(dataTiendaVentas);
        res.send({ventaRealizada: venta,
                    idVenta: ventaCabecera.id,
                  ventaTienda: ventaTienda});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CREATE_PURCHASE');
    }
}



module.exports = {individualPurchase};