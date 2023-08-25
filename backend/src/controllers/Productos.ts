import { Request, Response } from "express"
import ProductoModel from "../models/Prodcutos";
import PorductImagenModel from "../models/Productos_imagenes";
import { matchedData } from "express-validator";
import TiendaModel from "../models/Tiendas";
import { sequelize } from "../config/db";

export async function CreateProduct(req:Request, res:Response) {
    try{
        if(!req.body.imagen) return res.status(400).send('ERROR_GETTING_IMAGES');
        const {nombre, precio, tienda_id, categoria_id, descripcion, cantidad} = matchedData(req);

        const status = '0'; //Producto inactivo

        // crear producto mediante una transaccion para asegurar que se cree el producto con sus respectivas imagenes
        const resultTransaction = await sequelize.transaction(async (t:any) => {  
            const productCreated = await ProductoModel.create({
                nombre,
                precio,
                categoria_id,
                tienda_id,
                descripcion,
                cantidad,
                status
            }, {transaction:t})
            
            // crear objeto de imagenes que se van a guardar en la tabla productoImagenes
            let imagenesReq = req.body.imagen.trim();
            const imagenObject: Array<string> = imagenesReq.split(' ');
            const imagenes = await imagenObject.map((imagen: string) => {
                return {
                    producto_id: productCreated.id,
                    ruta: imagen
                }
            });

            await PorductImagenModel.bulkCreate(imagenes, {transaction:t})
            return{
                productCreated,
                imagenObject
            }
        })


        return res.status(200).send({
            productCreated: resultTransaction.productCreated,
            productImagenes: resultTransaction.imagenObject
        })
    }catch(err:any){
        console.log(err)
        return res.status(500).send('Error al crear el producto')
    }
}


export async function getProductByName(req:Request, res:Response) {
    try{
        const {productName=''} = req.params;
        const product = await ProductoModel.findProductsByName(productName);
        res.status(200).send({products: product})
    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_PRODUCT_BY_NAME')
    }
}


export async function getAllProducts(req:Request, res:Response) {
    try{
        const { page = 0, size = 10} = req.query;

        const pageNumber = parseInt(page.toString());
        const pageSize = parseInt(size.toString());

        const products = await ProductoModel.findAllProducts(pageNumber, pageSize);
        res.status(200).send({products})

    }catch(err:any){
        console.log(err)
        res.status(500).send('ERROR_FINDING_ALL_PRODUCTS')
    }
}


export async function getProductByTiendaRIF(req:Request, res:Response) {
    try{
        const {tiendaRif = ''} = req.params;
        //validar que el tiendaRIF no sea un string
        if(!parseInt(tiendaRif)) return res.status(505).send('RIF_CAN_NOT_BE_A_STRING')
        const tienda_rif = parseInt(tiendaRif);


        //validar que la tienda con el rif exista
        const tiendaVerificada = await TiendaModel.findOne({where: {RIF: tienda_rif}});  
        if(!tiendaVerificada) return res.status(500).send('RIF_NOT_FOUND')


        const data = await ProductoModel.getProductsByTiendaRIF(tienda_rif);
        return res.status(200).send({ productosTienda: data });
    }catch(err:any){
        console.log(err)
        return res.status(500).send('ERROR_FINDING_PRODUCTOS_BY_TIENDA_RIF')
    }
}


export async function getProductByID(req:Request, res:Response) {
    try{
        const {productId = ''} = req.params;
        //validar que el ProductoID no sea un string
        if(!parseInt(productId)) return res.status(505).send('ID_CAN_NOT_BE_A_STRING')

        const product_id = parseInt(productId);
        const product = await ProductoModel.findProductByID(product_id);

        if(product === null) return res.status(200).send({products: []})

        return res.status(200).send({ product });
    }catch(err:any){
        console.log(err)
        return res.status(500).send('ERROR_FINDING_PRODUCTS_BY_ID')
    }
}
