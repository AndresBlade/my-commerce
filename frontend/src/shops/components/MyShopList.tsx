import { ShopForm } from '../../user/pages/MyShopsPage';
import { Shop } from '../interfaces/Shop';
import { MyShopCard } from './MyShopCard';

type Props = {
	shops: Shop[] | null;
	setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
	setInitialState: React.Dispatch<React.SetStateAction<ShopForm>>;
	setEditShop: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MyShopList = ({
	shops,
	setShowModal,
	setInitialState,
	setEditShop,
}: Props) => {
	return (
		<div className="p-8 overflow-hidden w-[80%] mx-auto flex flex-col gap-4">
			{shops?.map(shop => (
				<MyShopCard
					shop={shop}
					setShowModal={setShowModal}
					key={shop.RIF}
					setInitialState={setInitialState}
					setEditShop={setEditShop}
				/>
			))}
		</div>
	);
};
