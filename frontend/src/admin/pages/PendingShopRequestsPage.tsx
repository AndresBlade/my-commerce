import { useState, useEffect, useContext } from 'react';
import { PendingRegisterShop } from '../../shops/interfaces/PendingRegisterShop';
import { getShopRegisterRequests } from '../../shops/helpers/getShopRegisterRequests';
import { AuthContext } from '../../auth/context/AuthContext';
import { ShopRegisterCard } from '../components/ShopRegisterCard';
export const PendingShopRequestsPage = () => {
	const {
		user: { token },
	} = useContext(AuthContext);

	const [pendingShops, setPendingShops] = useState<
		null | PendingRegisterShop[]
	>(null);

	useEffect(() => {
		getShopRegisterRequests(token)
			.then(response => setPendingShops(response.tiendasOnStandby.rows))
			.catch(err => console.log(err));
	}, [token]);

	console.log(pendingShops);
	return (
		<>
			{pendingShops && pendingShops.length > 0 ? (
				<ShopRegisterCard
					shop={pendingShops[0]}
					setPendingShops={setPendingShops}
				/>
			) : (
				<p>no hay solicitudes de registro de tienda pendientes</p>
			)}
		</>
	);
};
