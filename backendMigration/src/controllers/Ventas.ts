import { Request, Response } from "express";
import VentasCabeceraModel from "../models/Ventas_cabecera";
import VentasDetallesModel from "../models/Ventas_detalles";
import ProductoModel from "../models/Prodcutos";
import {sequelize} from "../config/db";


export const createPurchase = async (req:Request, res:Response) =>{ 
    try{
        const {producto_id, cantidad} = req.body;
        const User = req.body.user;
        const clientData = User.clientBelongToUser.dataValues.clientData.dataValues;
        let client_id = clientData.id;

        const validProduct = await ProductoModel.findOne({where:{id: producto_id}});
        if(!validProduct) return res.status(400).send('PRODUCT_NOT_FOUND');
        if(validProduct.cantidad < cantidad) return res.status(500).send('THERE_IS_NOT_ENOUGH_PRODUCT')
        const productPrice = validProduct.precio  



        const resultTransaction = await sequelize.transaction(async (t:any) => {
            const newPurchase = await VentasCabeceraModel.create({
                cliente_id: client_id,
            }, {transaction: t});

            const newPurchaseDetails = await VentasDetallesModel.create({
                ventas_cabecera_id: newPurchase.id,
                producto_id: producto_id,
                cantidad: cantidad,
                precio: productPrice,
            }, {transaction: t});

            return newPurchaseDetails;
        }); 
        
        return res.status(200).send(resultTransaction);
    }catch(error:any){
        console.log(error);
        res.status(400).send('ERROR_CREATING_PURCHASE');
    }
}
