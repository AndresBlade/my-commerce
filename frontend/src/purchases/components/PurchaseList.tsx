import { useState, useEffect } from 'react';
import { Purchase } from '../../purchases/interfaces/Purchase';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { getPurchasesByUser } from '../helpers/getPurchasesByUser';
import { PurchaseCard } from './PurchaseCard';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export const PurchaseList = () => {
	const [purchases, setPurchases] = useState<Purchase[] | null>(null);
	const {
		user: { token },
	} = useContext(AuthContext);
	useEffect(() => {
		getPurchasesByUser(token)
			.then(response => {
				console.log(response);
				setPurchases(response);
			})
			.catch(err => console.log(err));
	}, [token]);

	const generatePDF = () => {
		const doc = new jsPDF();

		if (purchases) {
			const columns = [
				'Nombre',
				'Cantidad',
				'Precio individual',
				'Total',
			];
			const rows = purchases.map(purchase => [
				purchase.detallesProducto.nombre,
				purchase.detallesVenta.cantidad,
				purchase.detallesProducto.precio,
				purchase.detallesVenta.cantidad *
					purchase.detallesProducto.precio,
			]);

			doc.text('MyCommerce', 15, 15);
			const currentDate = new Date();
			const formattedDate = `${currentDate.getDate()}/${
				currentDate.getMonth() + 1
			}/${currentDate.getFullYear()}`;
			doc.text(
				`Fecha: ${formattedDate}`,
				doc.internal.pageSize.width - 60,
				15
			);

			autoTable(doc, {
				startY: 25,
				head: [columns],
				body: rows,
			});

			doc.save('reporte_compras.pdf');
		}
	};

	return (
		<div className="compras__flex">
			{purchases?.map(purchase => (
				<PurchaseCard key={purchase.ventasCabecera.id} {...purchase} />
			))}
			<button
				className="bg-dark-blue m-4 transition-all hover:scale-105 font-semibold block text-center text-md w-64 p-3 rounded-full text-blanco shadow-xl mx-auto"
				onClick={generatePDF}
			>
				Descargar PDF
			</button>
		</div>
	);
};
