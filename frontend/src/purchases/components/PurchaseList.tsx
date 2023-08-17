import { useState, useEffect } from 'react';
import { Purchase } from '../../purchases/interfaces/Purchase';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { getPurchasesByUser } from '../helpers/getPurchasesByUser';
import { PurchaseCard } from './PurchaseCard';

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
	return (
		<div className="compras__flex">
			{purchases?.map(purchase => (
				<PurchaseCard key={purchase.ventasCabecera.id} {...purchase} />
			))}
		</div>
	);
};
