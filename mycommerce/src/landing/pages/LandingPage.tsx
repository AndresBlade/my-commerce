import { ProductList } from '../../products/components/ProductList';
import { Header } from '../../ui/components';
import { LandingHero } from '../components/LandingHero';
import { getShops } from '../../shops/helpers/getShops';
import { ShopList } from '../../shops/components/ShopList';
import { SesionModal } from '../../ui/components/SesionModal';

export default function LandingPage() {
	document.title = 'Bienvenido a MyCommerce';
	return (
		<>
			<main>
				<LandingHero />
				{/* <!-- Tiendas destacadas --> */}
				<div className="w-[90%] mx-auto my-10">
					<h2 className="text-[1.3rem] font-normal md:text-3xl">Tiendas Destacadas <a href='explorar' className='ml-2 text-sm text-azul font-semibold'>Ver tiendas</a></h2>
					<div className="h-[5px] bg-azul w-[35%] mt-3"></div>
				</div>

				<section className="w-[95%] mx-auto">
					<ShopList />
				</section>

				<div className="w-[90%] mx-auto my-10">
					<h2 className="text-[1.3rem] font-normal md:text-3xl">Productos Destacados <a href='explorar' className='ml-2 text-sm text-azul font-semibold'>Ver Productos</a></h2>
					<div className="h-[5px] bg-azul w-[35%] mt-3"></div>
				</div>
				
				<section className="w-[95%] mx-auto">
					<ProductList />
				</section>
			</main>
		</>
	);
}
