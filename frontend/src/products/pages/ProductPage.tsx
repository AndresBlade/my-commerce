import { useLoaderData } from 'react-router';
import { SesionModal } from '../../ui/components/SesionModal';
import { SingleProductWrapper } from '../interfaces/SingleProductWrapper';
import { ProductGallery } from '../components/ProductGallery';
import { ProductDetails } from '../components/ProductDetails';
import '../../css/productView.css';

export const ProductPage = () => {
	const { product } = useLoaderData() as SingleProductWrapper;
	console.log(product);

	return (
		<>
			<main className="bg-bg-degradado">
				<section className="w-[90%] flex justify-around mx-auto ">
					<ProductGallery {...product} />
					<ProductDetails {...product} />
				</section>
			</main>

			<SesionModal />
		</>
	);
};
