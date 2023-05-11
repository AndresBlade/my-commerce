const { matchedData } = require('express-validator');
const { productoModel } = require('../models');
const { ventasCabeceraModel } = require('../models');
const { ventasDetalleModel} = require('../models');
const {handleHttpErros} = require('../utils/handleErrors');


const individualPurchase = async (req, res) => {
    try{
        const userData = req.user.dataValues;
        const ventaDetalle = req.body;

        const venta = await ventasDetalleModel.create(ventaDetalle);

        console.log(venta.id);

        const dataVentaCabecera = {
            ventas_detalles_id: venta.id,
            cliente_id: userData.id,
        }

        const ventaCabecera = await ventasCabeceraModel.create(dataVentaCabecera);

        res.send({ventaRealizada: venta,
                  idVenta: ventaCabecera.id});
    }catch(e){
        console.log(e);
        handleHttpErros(res, 'ERROR_CREATE_PURCHASE');
    }
}



module.exports = {individualPurchase};