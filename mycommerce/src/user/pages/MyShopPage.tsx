import { MyShopList } from '../../shops/components/MyShopList';
import { CreateShopButton } from '../../shops/components/CreateShopButton';
import { CreateShopModal } from '../../shops/components/CreateShopModal';
import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { Shop } from '../../shops/interfaces/Shop';
import { getShopsByUser } from '../../shops/helpers/getShopsByUser';

export const MyShopsPage = () => {
	const [showModal, setShowModal] = useState(false);
	const {
		userData: {
			token,
			user: { id },
		},
	} = useContext(AuthContext);
	const [shops, setShops] = useState<Shop[] | null>(null);
	useEffect(() => {
		getShopsByUser(id, token)
			.then(response => setShops(response.data))
			.catch(err => console.log(err));
	}, [id, token]);
	return (
		<>
			<CreateShopButton setShowModal={setShowModal} />
			<MyShopList shops={shops} />
			<CreateShopModal
				showModal={showModal}
				setShowModal={setShowModal}
				setShops={setShops}
			/>
		</>
	);
};
