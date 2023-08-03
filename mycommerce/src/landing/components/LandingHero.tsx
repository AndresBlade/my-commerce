import HeroImg from '../../assets/asdf2.png';
import { Product } from '../../products/interfaces/Product';
import { ProductWrapper } from '../../products/interfaces/ProductWrapper';
import { getProducts } from '../../products/helpers/getProducts';

export const LandingHero = () => {
	return (
		<>
			<section className='bg-bg-degradado'>
				<div className="w-[95%] mx-auto text-center p-10 lg:text-left lg:grid grid-cols-2 grid-rows-2">
					<div className="flex flex-col justify-evenly text-white">
						<h1 className="text-blanco mb-4 uppercase font-semibold text-[1.5rem] md:text-[2.8rem]">Compra de forma segura</h1>
						<div className="mx-auto h-[5px] bg-amarillo w-[35%] lg:mx-0"></div>

						<p className="text-[1.1rem] my-8 text-white font-medium md:text-[1.5rem]">
							Crea tu cuenta de forma gratuita, para comprar en
							tiendas responsables y seguras
						</p>
						<div className="mx-auto h-[5px] bg-amarillo w-[75%] lg:mx-0"></div>
					</div>

					<div className="grid-img">
						<img src={HeroImg} alt="Commerce"/>
					</div>

					<a href="vistas/signup.html" className='block bg-blanco mb-auto text-center py-6 px-auto hover:bg-opacity-70 lg:px-16 rounded-3xl cursor-pointer md:mt-5 md:mr-auto'>
						<div  className="text-azul text-[1.3rem] font-bold">Crea tu cuenta</div>
					</a>
				</div>
			</section>
		</>
	);
};
