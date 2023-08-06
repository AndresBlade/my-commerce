import { Sequelize, Model, DataTypes, CreationOptional,Optional, InferAttributes, InferCreationAttributes, BelongsTo} from 'sequelize'
import { sequelize } from '../config/db';
import CategoriaInterface from './interfaces/CotegoriaInterfae';
import ProductoModel from './Prodcutos';


class CategoriaModel extends Model<CategoriaInterface > implements CategoriaInterface {
    public id!: number;
    public descripcion!: string;



    // Metodos personalizados

}

CategoriaModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        descripcion: {
            type: DataTypes.STRING,
        }

    },
    {
        sequelize,
        tableName: "categorias",
        timestamps: false,
    }
);

CategoriaModel.belongsTo(ProductoModel, {
    foreignKey: 'categoria_id',
    as: 'categoria'
})

export default CategoriaModel;