import { Product } from '../../products/interfaces/Product';

export const ShopProductCard = ({
	descripcion,
	imagenes,
	nombre,
	precio,
	categoria: { descripcion: categoryDescription },
}: Product) => {
	console.log(imagenes);
	return (
		<section className="relative max-w-[12rem] min-w-[12rem] flex flex-col rounded-md shadow-md bg-white cursor-pointer transition-shadow duration-300 hover:shadow-xl">
			<img
				src={imagenes[Math.floor(Math.random() * imagenes.length)].ruta}
				className="max-h-[12rem] min-h-[12rem] object-cover"
				alt={nombre}
			/>
			<div className="flex flex-col p-4">
				<span className="text-xl mb-2 text-center overflow-hidden">
					{nombre}
				</span>
	
				<span className="text-sm mb-2 break-words text-center">{descripcion}</span>
				<span className="text-[1.5rem] mb-2 text-center">${precio}</span>
				<span className="block w-[79%] mx-auto absolute bottom-0  text-center text-[.8rem] mb-2">{categoryDescription}</span>
			</div>
		</section>
	);
};
