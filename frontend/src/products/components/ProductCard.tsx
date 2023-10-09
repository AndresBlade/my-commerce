import { Link } from 'react-router-dom';
import { Product } from '../interfaces/Product';

export const ProductCard = ({ imagenes, nombre, precio, id }: Product) => {
	return (
		<Link
			to={`/producto/${id}`}
			className="mx-auto max-w-[12rem] min-w-[12rem] flex flex-col rounded-md shadow-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow-xl"
		>
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)].ruta}
				className="max-h-[12rem] min-h-[12rem] object-contain"
				alt={nombre}
			/>
			<div className="flex flex-col p-4">
				<span className="bg-dark-blue text-blanco text-[.8rem] font-semibold w-[55%] rounded-sm p-1 mb-2">
					Envío Gratis
				</span>
				<span className="text-[1.5rem] mb-2">${precio}</span>
				<span className="text-green-600 mb-2">Envío gratis</span>
				<span className="text-[.8rem] font-light overflow-hidden">
					{nombre}
				</span>
			</div>
		</Link>
	);
};
