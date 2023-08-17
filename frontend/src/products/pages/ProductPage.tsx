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
			<main>
				<section className="content">
					<ProductGallery {...product} />
					<ProductDetails {...product} />
				</section>
			</main>

			<SesionModal />
		</>
	);
};
