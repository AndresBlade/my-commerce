import { Purchase } from '../interfaces/Purchase';

export const PurchaseCard = ({
	detallesProducto: { nombre, precio },
	detallesVenta: { cantidad },
}: Purchase) => {
	return (
		<div className="compras__compra">
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
				{precio}
			</p>
			<p>
				<span className="bold">Total: </span>
				{precio * cantidad}
			</p>
		</div>
	);
};
