import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/db';
import ClienteModelAttributes from './interfaces/ClienteInterface';
import TiendaModel from './Tiendas';
import VentasCabeceraModel from './Ventas_cabecera';
import ProductoModel from './Prodcutos';


class ClienteModel extends Model<ClienteModelAttributes> implements ClienteModelAttributes {
    
    public id!: number;
    public usuario_id!: number;
    public nombre!: string;
    public imagen!: string;
  
    
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;


    //metodos personalizados
    static initializeAssociations() {
        //Relacion entre cliente y tiendas, un cliente puede tener muchas tiendas y una tienda pertenece a un solo cliente
        ClienteModel.hasMany(TiendaModel, {foreignKey: 'cliente_id', as: 'tiendaCliente',});
        TiendaModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id', as: 'tiendaCliente',});

        //Relacion entre Cliente y ventas cabecera, un cliente puede tener muchas ventas cabecera y una venta cabecera pertenece a un solo cliente
        ClienteModel.hasMany(VentasCabeceraModel, {foreignKey: 'cliente_id'});
        VentasCabeceraModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id'});
    }


    static findClientByUserID = async function(user_id: number): Promise<ClienteModelAttributes | null>{
        const client = await ClienteModel.findOne({
            where: {usuario_id: user_id},
        })
        if(!client) throw new Error('No se encontro el cliente');
        return{
            id: client.id!,
            usuario_id: client.usuario_id!,
            nombre: client.nombre!,
            imagen: client.imagen!,
        }
    }

    static desactivateTiendasPerClient= async function (clientID: number) {
        //este método lo que hace es desactivar todas las tiendas de un cliente y desactivar todos los productos de esas tiendas
        const resultTransaction = await sequelize.transaction(async (t:any) => {
            //busca todas las tiendas que le pertenezcan al cliente
            const tiendasPerClient = await TiendaModel.findTiendaByClient(clientID);

            //de esas tiendas hace un .map para recorrer el array y ir actulizando cada tienda y desactivando sus productos
            const tiendasUpdated = tiendasPerClient.map(async (tienda) => {
                const updateTiendasPerClient = await TiendaModel.update(
                        {status: '2'}, //status 2 es desactivado/baneada
                        {where: {RIF: tienda.RIF}, transaction: t}
                    )
                    if(!updateTiendasPerClient) throw new Error('No se pudo desactivar las tiendas del cliente');

                    //esta llama a su vez la función desactivateProductsPerTienda que desactiva todos los productos de una tienda
                    const productsDesactivate = await ProductoModel.desactivateProductsPerTienda(tienda.RIF);
                    if(!productsDesactivate) throw new Error('No se pudo desactivar los productos de las tiendas del cliente');

                    //si todo sale bien retorna true
                    return true;
            })

            const result = await Promise.all(tiendasUpdated);
            if(!result) throw new Error('No se pudo desactivar las tiendas del cliente');
            else return true;
        })
        if(!resultTransaction) throw new Error('No se pudo desactivar las tiendas del cliente');
        else return true;
    }
}

ClienteModel.init(
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        usuario_id: {
            
            type: DataTypes.INTEGER,
        },
        nombre: {
             type: DataTypes.STRING 
        },
        imagen: {
             type: DataTypes.STRING 
        }, 
 
    },
    {
        sequelize,
        tableName: "clientes",
        timestamps: true,
    }
);

ClienteModel.initializeAssociations();

    
export default ClienteModel;
