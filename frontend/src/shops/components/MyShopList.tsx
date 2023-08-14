import { Shop } from '../interfaces/Shop';
import { MyShopCard } from './MyShopCard';

type Props = {
	shops: Shop[] | null;
};

export const MyShopList = ({ shops }: Props) => {
	return (
		<div className="misTiendas__grid">
			{shops?.map(shop => (
				<MyShopCard {...shop} key={shop.RIF} />
			))}
		</div>
	);
};
