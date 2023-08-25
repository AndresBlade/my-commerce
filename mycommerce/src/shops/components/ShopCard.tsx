import { Shop } from '../interfaces/Shop';
import { Link } from 'react-router-dom';

export const ShopCard = ({ RIF, imagen, nombre, descripcion }: Shop) => {
	// const url = new URL('localhost:5173/tienda.html');
	// url.searchParams.set('RIF', RIF.toString());
	return (
		<Link to={`/tienda/${RIF.toString()}`} className="group max-w-[12rem] min-w-[12rem] flex flex-col rounded-md shadow-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow-xl">
			<img src={imagen} alt="" className='max-h-[12rem] min-h-[12rem] object-cover'/>
			<div className="flex flex-col p-4 items-center">
				<span className="text-[1.2rem] font-medium mb-2">{nombre}</span>
				<span className="text-[.8rem] font-light overflow-hidden text-center mb-2">{descripcion}</span>
				<span className="hidden text-[.8rem] group-hover:flex">Lara</span>
			</div>
		</Link>
	);
};
