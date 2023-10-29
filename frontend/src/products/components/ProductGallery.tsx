import { useEffect, useRef } from 'react';
import { Product } from '../interfaces/Product';

interface ImageProps {
	id?: number;
}

export const ProductGallery = ({ imagenes }: Product) => {
	const galleryContainerImg = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (galleryContainerImg.current) {
			console.log(imagenes);
			galleryContainerImg.current.style.backgroundImage = `url(${imagenes[0].ruta})`;
		}
	}, [imagenes]);

	const handleClickSliderImage = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	): void => {
		const target: ImageProps = e.target as ImageProps;
		if (galleryContainerImg.current && target.id) {
			galleryContainerImg.current.style.backgroundImage = `url(${
				imagenes[target.id].ruta
			})`;
		}
	};

	return (
		<article className="w-full lg:w-[40%] cursor-pointer">
			<div
				className="h-[300px] lg:h-[500px] bg-cover rounded-lg mb-8"
				ref={galleryContainerImg}
			></div>
			<div className="gallery__thumnails">
				{imagenes.map((image, index) => (
					<img
						className="w-[90px] max-w-[100%] rounded-2xl h-24"
						src={image.ruta}
						id={index.toString()}
						alt="Imagen del producto"
						key={index}
						onClick={handleClickSliderImage}
					/>
				))}
			</div>
		</article>
	);
};
