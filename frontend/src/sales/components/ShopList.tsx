import { Shop } from '../../shops/interfaces/Shop';
import { useState, useEffect } from 'react';
import { getShopsByUser } from '../../shops/helpers/getShopsByUser';
import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { SaleList } from './SaleList';

export const ShopList = () => {
	const [shops, setShops] = useState<Shop[] | null>(null);

	const {
		user: {
			specificData: { id },
			token,
		},
	} = useContext(AuthContext);

	useEffect(() => {
		getShopsByUser(id)
			.then(response => setShops(response.datosTienda))
			.catch(err => console.log(err));
	}, [id, token]);

	return (
		<div className="p-5 flex flex-col gap-4 w-full overflow-hidden">
			{shops?.map(shop => (
				<SaleList {...shop} key={shop.RIF} />
			))}
		</div>
	);
};
