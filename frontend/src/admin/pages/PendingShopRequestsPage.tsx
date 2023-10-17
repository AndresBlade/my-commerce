import { useState, useEffect, useContext } from 'react';
import { PendingRegisterShop } from '../../shops/interfaces/PendingRegisterShop';
import { getShopRegisterRequests } from '../../shops/helpers/getShopRegisterRequests';
import { AuthContext } from '../../auth/context/AuthContext';
import { ShopRegisterCard } from '../components/ShopRegisterCard';
import noStore from '../../assets/noStore.png';


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
				<div className='mx-auto m-12'>
					<img className='w-32 h-32 sm:w-64 sm:h-64 mx-auto' src={noStore} alt="" />
					<p className='text-xl sm:text-3xl text-center font-semibold text-black opacity-20'>No hay solicitudes de registro de tienda pendientes</p>
				</div>
			)}
		</>
	);
};
