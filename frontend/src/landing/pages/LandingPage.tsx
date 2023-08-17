import { ProductList } from '../../products/components/ProductList';
import { LandingHero } from '../components/LandingHero';
import { ShopList } from '../../shops/components/ShopList';

export default function LandingPage() {
	document.title = 'Bienvenido a MyCommerce';
	return (
		<>
			<main>
				<LandingHero />
				{/* <!-- Tiendas destacadas --> */}
				<div className="tiendas-destacadas_heading">
					<h2 className="heading">Tiendas Destacadas</h2>
					<div className="rectangulo-2"></div>
				</div>

				<section className="tiendas-destacadas">
					<ShopList />
				</section>

				<section>
					<div className="productos-destacados_heading">
						<h2 className="heading">Productos Destacados</h2>
						<div className="rectangulo-2"></div>
					</div>

					<ProductList />
				</section>
			</main>
		</>
	);
}
