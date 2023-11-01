import { Purchase } from '../interfaces/Purchase';

export const PurchaseCard = ({
	detallesProducto: { nombre, precio },
	detallesVenta: { cantidad },
}: Purchase) => {
	const total_iva = precio * 0.16;
	const precioTotal = precio + total_iva;

	return (
		<div className="grid md:grid-cols-4 rounded-md justify-between p-4 nth-[2n-1]:bg-azul">
			<p>
				<span className="bold">Nombre: </span>
				{nombre}
			</p>
			{/* <p>
				<span className="bold">Fecha: </span>
				{fecha} {hora}
			</p> */}
			{/*torpas no envía el createdAt, eso infringe mis derechos y los de este p */}
			<p>
				<span className="bold">Cantidad: </span>
				{cantidad}
			</p>
			<p>
				<span className="bold">Precio individual: </span>
				{precioTotal}$
			</p>
			<p>
				<span className="bold">Total: </span>
				{precioTotal * cantidad}$
			</p>
		</div>
	);
};
