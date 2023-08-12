import { Request, Response } from "express";
import {sequelize} from "../config/db";
import {getClientID} from '../utils/getClientID';
import TiendaModel from "../models/Tiendas";
import VentasCabeceraModel from "../models/Ventas_cabecera";
import VentasDetallesModel from "../models/Ventas_detalles";
import ProductoModel from "../models/Prodcutos";

export const createPurchase = async (req:Request, res:Response) =>{ 
    try{
        const {producto_id, cantidad} = req.body;

        //recupera el id del CLIENTE mediante el middleware de autenticacion 
        const client_id = getClientID(res);

        //valida que el producto exista
        const validProduct = await ProductoModel.findOne({where:{id: producto_id}});
        if(!validProduct) return res.status(400).send('PRODUCT_NOT_FOUND');

        //valida que el producto tenga stock suficiente
        if(validProduct.cantidad < cantidad) return res.status(500).send('THERE_IS_NOT_ENOUGH_PRODUCT')

        //recupera el precio del producto
        const productPrice = validProduct.precio  


        //crea la compra mediante una transaccion para asegurar que se cree la cabecera y el detalle, si alguna de esa consultas falla se hace un rollback de la transaccion (Es decir que no se crea nada)
        const resultTransaction = await sequelize.transaction(async (t:any) => {
            const newPurchase = await VentasCabeceraModel.create({
                cliente_id: client_id,
            }, {transaction: t});


            //actualiza el stock del producto
            await validProduct.decrement('cantidad', {by: cantidad});

            //Actualiza el saldo de la tienda en base a la cantidad de productos vendidos
            await TiendaModel.prototype.updateSaldo(validProduct.tienda_id, cantidad, productPrice);

            
            const newPurchaseDetails = await VentasDetallesModel.create({
                ventas_cabecera_id: newPurchase.id,
                producto_id: producto_id,
                cantidad: cantidad,
                precio: productPrice,
            }, {transaction: t});

            return {
                ventaCabeceraID: newPurchaseDetails.ventas_cabecera_id,
                productoId: newPurchaseDetails.producto_id,
                cantidad: newPurchaseDetails.cantidad,
                precioPorProducto: newPurchaseDetails.precio,
                totalCompra: newPurchaseDetails.precio * newPurchaseDetails.cantidad,
            };
        }); 

        
        return res.status(200).send(resultTransaction);
    }catch(error:any){
        console.log(error);
        return res.status(400).send('ERROR_CREATING_PURCHASE');
    }
}

export const getPurchaseByUser = async (_req:Request, res:Response) =>{ 
    try{
        //recupera el id del CLIENTE mediante el middleware de autenticacion 
        const client_id = getClientID(res);

        const purchases = await VentasCabeceraModel.prototype.getPurchsesByClient(client_id);
        
        res.status(200).send(purchases);
    }catch(error:any){
        console.log(error);
        res.status(400).send('ERROR_GETTING_PURCHASES');
    }
}

export const getProductsSoldByStore = async (req:Request, res:Response) =>{
    try{
        const {id = ''} = req.params;
        const tienda_id = parseInt(id);


        const productsSold = await TiendaModel.prototype.getAllSells(tienda_id);
        
        return res.status(200).send(productsSold);
    }catch(error:any){
        console.log(error);
        return res.status(400).send('ERROR_GETTING_PRODUCTS_SOLD');
    }
}