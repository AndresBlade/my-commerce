import CategoriaModel from "./Categorias";
import ClienteModel from "./Clientes";
import ProdutoModel from "./Prodcutos";
import PorductImagenModel from "./Productos_imagenes";
import RegionesModel from "./Regiones";
import TiendasRegionesModel from "./Tiendas_regiones";
import TiendaModel from "./Tiendas";
import UsuarioModel from "./Usuarios";
import VentasCabeceraModel from "./Ventas_cabecera";
import VentasDetallesModel from "./Ventas_detalles";


//Definicion de cada una de las relaciones entre las tablas de la base de datos



//----------Relaciones que tiene un usuario----------//

//relacion entre Usuarios y clientes (Un usuario puede tener solo un cliente y un cliente pertenece a un solo usuario)
UsuarioModel.hasOne(ClienteModel, {foreignKey: 'usuario_id'});
ClienteModel.belongsTo(UsuarioModel, {foreignKey: 'usuario_id'});


//----------Relaciones que tiene un cliente----------//

//Relacion entre cliente y tiendas, un cliente puede tener muchas tiendas y una tienda pertenece a un solo cliente
ClienteModel.hasMany(TiendaModel, {foreignKey: 'cliente_id'});
TiendaModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id'});

//Relacion entre Cliente y ventas cabecera, un cliente puede tener muchas ventas cabecera y una venta cabecera pertenece a un solo cliente
ClienteModel.hasMany(VentasCabeceraModel, {foreignKey: 'cliente_id'});
VentasCabeceraModel.belongsTo(ClienteModel, {foreignKey: 'cliente_id'});


//----------Relaciones que tiene una tienda----------//

//Relacion entre tienda y regiones, una tienda puede tener muchas regiones y muchas regiones pueden pertenecer a muchas tiendas, esta relacion se hace mediante una tabla intermedia llamada tiendas_regiones
TiendaModel.belongsToMany(RegionesModel, {through: TiendasRegionesModel, foreignKey: 'tienda_id'});
RegionesModel.belongsToMany(TiendaModel, {through: TiendasRegionesModel, foreignKey: 'region_id'});

//Relacion entre tienda y producto, una tienda puede tener muchos productos y un porducto pertenece a una sola tienda
TiendaModel.hasMany(ProdutoModel, {foreignKey: 'tienda_id'});
ProdutoModel.belongsTo(TiendaModel, {foreignKey: 'tienda_id'});


//----------Relaciones que tiene un producto----------//

//Relacion entre producto y categoria, un producto puede tener una categoria y una categoria puede tener muchos productos
ProdutoModel.belongsTo(CategoriaModel, {foreignKey: 'categoria_id'});
CategoriaModel.hasMany(ProdutoModel, {foreignKey: 'categoria_id'});

//relacion ente producto y imagenes, un producto puede tener muchas imagenes y una imagen pertenece a un solo producto
ProdutoModel.hasMany(PorductImagenModel, {foreignKey: 'producto_id'});
PorductImagenModel.belongsTo(ProdutoModel, {foreignKey: 'producto_id'});

//Relacion entre producto y ventas cabeceras, un producto puede tener muchas ventas cabeceras y una venta cabecera puede tener muchos productos, se usa una tabla intermedia llamada ventas_detalles
ProdutoModel.belongsToMany(VentasCabeceraModel, {through: VentasDetallesModel, foreignKey: 'producto_id'});
VentasCabeceraModel.belongsToMany(ProdutoModel, {through: VentasDetallesModel, foreignKey: 'ventas_cabecera_id'});

