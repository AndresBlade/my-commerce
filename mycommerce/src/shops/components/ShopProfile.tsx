import { useLoaderData } from 'react-router';
import { ShopLoader } from '../interfaces/ShopLoader';

export const ShopProfile = () => {
	const { shopData } = useLoaderData() as ShopLoader;
	const { RIF, descripcion, imagen, nombre, createdAt } = shopData.data;
	return (
		<aside className="bg-azul sticky">
			<div className="flex flex-col p-4">
				<div className="flex flex-wrap items-center gap-3 justify-center">
					<img
						className="w-28 rounded-full"
						alt="Tienda-logo"
						src={imagen}
					/>
					<h1 className="text-[2rem] text-blanco">{nombre}</h1>
				</div>
				<p className="text-center md:text-left font-thin my-4 text-blanco">{descripcion}</p>
				<ul className='flex flex-col items-center md:items-start gap-2'>
					<h2 className="font-semibold text-blanco text-center">Acerca de {nombre}</h2>
					<li className="text-blanco text-center">{RIF}</li>
					<li className="text-blanco text-center">
						Creada: {createdAt.split('T')[0]}
					</li>
					<li className='text-blanco text-center'>Lara</li>
				</ul>
			</div>
		</aside>
	);
};
