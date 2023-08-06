import { Sale } from '../interfaces/Sale';

export const SaleCard = ({
	venta_cabecera: {
		venta_detalle: { producto, precio, cantidad },
		ventas_detalles_id,
	},
	createdAt: fechaCreacion,
}: Sale) => {
	return (
		<div className="ventas__venta">
			<p className="ventas__nombreProducto">
				<span className="ventas__title">Nombre del producto: </span>
				{producto.nombre}
			</p>
			<p className="ventas__fechaCompraProducto">
				<span className="ventas__title">Fecha de compra: </span>
				{fechaCreacion.split('T')[0] +
					' ' +
					fechaCreacion.split('T')[1].split('.')[0]}
			</p>
			<p className="ventas__precioProducto">
				<span className="ventas__title">Precio individual: </span>
				{precio}
			</p>
			<p className="ventas__cantidadProducto">
				<span className="ventas__title">Cantidad: </span>
				{cantidad}
			</p>
			<p className="ventas__totalProducto">
				<span className="ventas__title">Total: </span>
				{cantidad * parseFloat(precio)}
			</p>
			<p className="ventas__nroFactura">
				<span className="ventas__title">Número de Factura: </span>
				{ventas_detalles_id}
			</p>
		</div>
	);
};
