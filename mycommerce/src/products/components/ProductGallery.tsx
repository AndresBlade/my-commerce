import { useRef } from 'react';
import { SingleProduct } from '../interfaces/SingleProduct';

export const ProductGallery = ({ imagenes: productImages }: SingleProduct) => {
	const images = productImages.split(' ');
	const galleryContainerImg = useRef<HTMLDivElement>(null);

	function handleLoad() {
		if (galleryContainerImg.current) {
			galleryContainerImg.current.style.backgroundImage = `url(${images[0]})`;
		}
	}

	return (
		<article className="gallery">
			<div
				className="gallery__container_img"
				onLoad={handleLoad}
				ref={galleryContainerImg}
			></div>
			<div className="gallery__thumnails">
				{images.map((imageString, index) => (
					<img
						className="gallery__thumnail"
						src={imageString}
						id={index.toString()}
						alt="Imagen del producto"
					/>
				))}
			</div>
		</article>
	);
};

//nos quedamos haciendo el slider, hay que buscar como cambiar la imagen dinamicamente, ya sea con useRef u otros
