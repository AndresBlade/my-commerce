import { useEffect, useRef } from 'react';
import { SingleProduct } from '../interfaces/SingleProduct';

interface ImageProps {
	id?: number;
}

export const ProductGallery = ({ imagenes: productImages }: SingleProduct) => {
	const images: string[] = productImages.split(' ');
	const galleryContainerImg = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (galleryContainerImg.current) {
			console.log(images[0]);
			galleryContainerImg.current.style.backgroundImage = `url(${images[0]})`;
		}
	}, [images]);

	const handleClickSliderImage = (
		e: React.MouseEvent<HTMLImageElement, MouseEvent>
	): void => {
		const target: ImageProps = e.target as ImageProps;
		if (galleryContainerImg.current && target.id) {
			console.log(images[0]);
			galleryContainerImg.current.style.backgroundImage = `url(${
				images[target.id]
			})`;
		}
	};

	return (
		<article className="w-[40%] cursor-pointer">
			<div
				className="h-[500px] bg-cover rounded-lg mb-8"
				ref={galleryContainerImg}
			></div>
			<div className="flex justify-center gap-8">
				{images.map((imageString, index) => (
					<img
						className="w-[90px] max-w-[100%] rounded-2xl h-24"
						src={imageString}
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
