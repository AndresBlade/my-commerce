import { useContext } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import { PendingRegisterShop } from '../../shops/interfaces/PendingRegisterShop';
import { determineShopRegister } from '../helpers/DetermineShopRegister';
import foto1 from '../../assets/foto1.webp';
import foto2 from '../../assets/foto2.jpg';
import foto3 from '../../assets/foto3.jpg';

interface Props {
	shop: PendingRegisterShop;
	setPendingShops: React.Dispatch<
		React.SetStateAction<null | PendingRegisterShop[]>
	>;
}

export const ShopRegisterCard = ({ shop, setPendingShops }: Props) => {
	const {
		user: { token },
	} = useContext(AuthContext);

	const reviewNextShop = () => {
		setPendingShops(pendingShops => {
			const newPendingShops = pendingShops ? pendingShops.slice(1) : null;
			console.log('cambio');
			console.log(newPendingShops);
			return newPendingShops;
		});
	};

	return (
		<article className='p-8 m-8 bg-gris rounded-2xl w-full overflow-hidden'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex flex-col mx-auto md:mx-0 md:flex-row items-center gap-4'>
					<img className='w-32 h-32 mx-auto mb-2 md:w-60 md:h-60 object-contain rounded-full' src={shop.imagen} alt={shop.nombre} />
					<div className='flex-col text-center md:text-left'>
						<h1 className='text-2xl md:text-4xl font-semibold'>{shop.nombre}</h1>
						<h2 className='text-md md:text-lg font-normal'>{shop.RIF}</h2>
					</div>
				</div>
			{/*----------- Me parece interesante si se le ponen algunos productos que venda la tienda ----------- */}
				<div className='hidden lg:flex gap-4 justify-center'>
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto1} alt={shop.nombre} />
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto2} alt={shop.nombre} />
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto3} alt={shop.nombre} />
				</div>
			</div>
			{/*------------------------------------------------------------------------------------------------- */}

			<div className='flex-col text-center'>

				<div className='flex lg:hidden gap-4 justify-center'>
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto1} alt={shop.nombre} />
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto2} alt={shop.nombre} />
					<img className='w-16 md:w-24 h-16 md:h-24 object-contain bg-white p-2 rounded-lg' src={foto3} alt={shop.nombre} />
				</div>

				<div className='break-words my-4'>
					<span className='font-semibold'>Operativa en:</span>
					<ul>
						{shop.regionesTienda.map(region => (
							<li className='' key={region.id}>{region.descripcion}</li>
						))}
					</ul>
				</div>

				<p className='text-sm md:text-lg my-4'>{shop.descripcion}</p>
			</div>

			<div className='flex flex-col md:flex-row gap-4'>
				<button 
					className='text-blanco bg-dark-blue w-full mx-auto py-4 rounded-md hover:opacity-80' 
					onClick={() => {
						determineShopRegister(shop.RIF, token, true)
							//TIENDA_ACCEPTED_SUCCESSFULLY
							//TIENDA_DENIED_SUCCESSFULLY
							.then(response => {
								console.log(response);
								reviewNextShop();
							})
							.catch((err: Error) => {
								//NOT_PAYLOAD_DATA
								return console.log(err.message);
							});
					}}
				>
					Aceptar
				</button>
				<button
					className='text-blanco bg-red-400 w-full mx-auto py-4 rounded-md hover:opacity-80'
					onClick={() => {
						determineShopRegister(shop.RIF, token, false)
							.then(response => {
								console.log(response);
								reviewNextShop();
							})
							.catch((err: Error) => {
								return console.log(err.message);
							});
						reviewNextShop();
					}}
				>
					Denegar
				</button>
			</div>

			<button
				className='block text-gray-700 mx-auto text-center mt-4 hover:opacity-70'
				onClick={() => {
					console.log('pasa al siguiente en la lista');
				}}
			>
				Omitir
			</button>		

		</article>
	);
};
