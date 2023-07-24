import { useLoaderData } from 'react-router';
import { SesionModal } from '../../ui/components/SesionModal';
import { SingleProductWrapper } from '../interfaces/SingleProductWrapper';
import { ProductGallery } from '../components/ProductGallery';
import { ProductDetails } from '../components/ProductDetails';
import '../../css/productView.css';

export const ProductPage = () => {
	const { productByID } = useLoaderData() as SingleProductWrapper;

	return (
		<>
			<main>
				<section className="content">
					<ProductGallery {...productByID} />
					<ProductDetails {...productByID} />
				</section>
			</main>

			<SesionModal />
		</>
	);
};
