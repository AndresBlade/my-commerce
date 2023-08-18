import { ProductSold, SaleDetails } from '../interfaces/ProductSold';

type Props = {
	productSold: ProductSold;
	saleDetails: SaleDetails;
};

export const SaleCard = ({
	productSold: { nombre, precio },
	saleDetails: {
		createdAt: fechaCreacion,
		detallesCompra: { cantidad, ventas_cabecera_id },
	},
}: Props) => {
	return (
		<div className="ventas__venta">
			<p className="ventas__nombreProducto">
				<span className="ventas__title">Nombre del producto: </span>
				{nombre}
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
				{ventas_cabecera_id}
			</p>
		</div>
	);
};
