import { ProductList } from '../../products/components/ProductList';
import { Header } from '../../ui/components';
import { LandingHero } from '../components/LandingHero';
import CancelImg from '../../assets/cancel.png';
import { getShops } from '../../shops/helpers/getShops';
import { ShopList } from '../../shops/components/ShopList';

export default function LandingPage() {
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
				<section className="modalSesion__sesion">
					<div className="modalSesion__sesion-container">
						<img
							src={CancelImg}
							className="modalSesion__sesion-img"
						/>
						<h2 className="modalSesion__sesion-title">
							¿Desea salir de sesión?
						</h2>
						<div className="modalSesion__sesion-options">
							<a href="#" className="modalSesion__si">
								Sí
							</a>
							<a href="#" className="modalSesion__no">
								No
							</a>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
