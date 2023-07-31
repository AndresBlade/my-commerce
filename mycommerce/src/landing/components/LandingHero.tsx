import HeroImg from '../../assets/asdf.png';
import { Product } from '../../products/interfaces/Product';
import { ProductWrapper } from '../../products/interfaces/ProductWrapper';
import { getProducts } from '../../products/helpers/getProducts';

export const LandingHero = () => {
	return (
		<>
			{/* <!-- primera parte --> */}
			<div className='bg-bg-degradado'>
				{/* <!-- primera parte --> */}
				<section className="box-container">
					<div className="box box-1">
						<h1 className="heading">Compra de forma segura</h1>
						<div className="rectangulo"></div>
						<p className="heading-text">
							Crea tu cuenta de forma gratuita, para comprar en
							tiendas responsables y seguras
						</p>
						<div className="rectangulo-2"></div>
						<a href="vistas/signup.html" className="btnCrearCuenta">
							<div className="btn-texto">Crea tu cuenta</div>
						</a>
					</div>
					<div className="box box-2">
						<img src={HeroImg} alt="" className="img-1" />
					</div>
				</section>
			</div>
		</>
	);
};
