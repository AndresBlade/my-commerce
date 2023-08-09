import { Purchase } from '../interfaces/Purchase';

export const PurchaseCard = ({
	createdAt,
	venta_detalle: {
		cantidad,
		precio,
		producto: { nombre },
	},
}: Purchase) => {
	const [fecha, hora] = createdAt.split('T');
	return (
		<div className="compras__compra">
			<p>
				<span className="bold">Nombre: </span>
				{nombre}
			</p>
			<p>
				<span className="bold">Fecha: </span>
				{fecha} {hora}
			</p>
			<p>
				<span className="bold">Cantidad: </span>
				{cantidad}
			</p>
			<p>
				<span className="bold">Precio individual: </span>
				{precio}
			</p>
			<p>
				<span className="bold">Total: </span>
				{parseInt(precio) * cantidad}
			</p>
		</div>
	);
};
