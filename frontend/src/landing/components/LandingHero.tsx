import HeroImg from '../../assets/asdf2.png';
import { Product } from '../../products/interfaces/Product';
import { ProductWrapper } from '../../products/interfaces/ProductWrapper';
import { getProducts } from '../../products/helpers/getProducts';

export const LandingHero = () => {
	return (
		<>
			<section className='bg-bg-degradado lg:h-[75vh]'>
				<div className="w-[95%] mx-auto text-center px-10 pb-10 pt-5 lg:text-left lg:pb-0 lg:grid grid-cols-8">
					<div className="my-auto col-span-4 flex flex-col text-white">
						<h1 className="text-blanco mb-4 uppercase font-semibold text-[1.5rem] md:text-[2rem] lg:text-[2.8rem]">Compra de forma segura</h1>
						<div className="mx-auto h-[5px] bg-amarillo w-[35%] lg:mx-0"></div>

						<p className="text-[1.1rem] my-8 text-white font-medium md:text-[1.5rem]">
							Crea tu cuenta de forma gratuita, para comprar en
							tiendas responsables y seguras
						</p>
						<div className="mb-3 mx-auto h-[5px] bg-amarillo w-[75%] lg:mx-0"></div>
						
						<a href="#" className='block rounded-3xl col-span-8 cursor-pointer bg-blanco mb-5 py-4 md:py-6 hover:bg-opacity-70 lg:px-16 lg:mr-auto'>
							<div  className="text-[.9rem] text-azul font-bold md:text-[1.3rem]">Crea tu cuenta</div>
						</a>
					</div>

					<div className="col-span-4">
						<img src={HeroImg} className='h-full mb-3 lg:ml-8 lg:mb-0' alt="Commerce"/>
					</div>

				</div>
			</section>
		</>
	);
};
