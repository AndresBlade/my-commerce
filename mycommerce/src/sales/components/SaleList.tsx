import { Shop } from '../../shops/interfaces/Shop';
import { useState, useEffect } from 'react';
import { Sale } from '../interfaces/Sale';
import { getSalesByRIF } from '../helpers/getSalesByShop';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { SaleCard } from './SaleCard';

export const SaleList = ({ nombre, RIF }: Shop) => {
	const [sales, setSales] = useState<Sale[] | []>([]);

	const {
		userData: { token },
	} = useContext(AuthContext);

	useEffect(() => {
		getSalesByRIF(RIF.toString(), token)
			.then(response => setSales(response))
			.catch(err => console.log(err));
	}, [RIF, token]);

	return (
		<div className="ventas__tienda">
			<h2>{nombre}</h2>
			{sales.length > 0 && (
				<div className="ventas__contenedor">
					{sales.map((sale, index) => (
						<SaleCard {...sale} key={index} /> //esto hay que reemplazarlo por el valor que devuelve el venta cabecera o venta detalle
					))}
				</div>
			)}
		</div>
	);
};
