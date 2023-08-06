import { Shop } from '../../shops/interfaces/Shop';
import { useState, useEffect } from 'react';
import { getShopsByUser } from '../../shops/helpers/getShopsByUser';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { SaleList } from './SaleList';

export const ShopList = () => {
	const [shops, setShops] = useState<Shop[] | null>(null);

	const {
		userData: {
			user: { id },
			token,
		},
	} = useContext(AuthContext);

	useEffect(() => {
		getShopsByUser(id, token)
			.then(response => setShops(response.data))
			.catch(err => console.log(err));
	}, [id, token]);

	return (
		<div className="ventas__flex">
			{shops?.map(shop => (
				<SaleList {...shop} key={shop.RIF} />
			))}
		</div>
	);
};
