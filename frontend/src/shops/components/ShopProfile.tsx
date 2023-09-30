import { useLoaderData } from 'react-router';
import { ShopLoader } from '../interfaces/ShopLoader';

export const ShopProfile = () => {
	const { shopData } = useLoaderData() as ShopLoader;
	const { datosTienda } = shopData;
	return (
		<aside className="bg-azul sticky">
			<div className="flex flex-col p-4">
				<div className="flex flex-wrap items-center gap-3 justify-center">
					<img
						className="w-28 rounded-full"
						alt="Tienda-logo"
						src={datosTienda.imagen}
					/>
					<h1 className="text-[2rem] text-blanco">
						{datosTienda.nombre}
					</h1>
				</div>
				<p className="text-center md:text-left font-thin my-4 text-blanco">
					{datosTienda.descripcion}
				</p>
				<ul>
					<h2 className="font-semibold text-blanco text-center">
						Acerca de {datosTienda.nombre}
					</h2>
					<li className="text-blanco text-center">
						{datosTienda.RIF}
					</li>
					<li className="text-blanco text-center">
						Creada: {datosTienda.createdAt.split('T')}
					</li>
					<li className="text-blanco text-center">Lara</li>
				</ul>
			</div>
		</aside>
	);
};
