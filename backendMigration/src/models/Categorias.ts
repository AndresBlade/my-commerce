import {Model, DataTypes} from 'sequelize'
import { sequelize } from '../config/db';
import CategoriaInterface from './interfaces/CotegoriaInterfae';


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



export default CategoriaModel;