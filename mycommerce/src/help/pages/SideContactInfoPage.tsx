import { Link, Outlet } from 'react-router-dom';
import contactanosImg from '../../assets/contactanos.png';

export const SideContactInfoPage = () => {
	return (
		<section className="bg-bg-degradado">
			<div className="w-[95%] gap-12 mx-auto text-center md:px-10 pb-10 pt-5 lg:text-left lg:pb-0 lg:grid grid-cols-8">
				<div className="my-auto col-span-4 flex flex-col text-white">
					<Outlet />
				</div>

				<div className="col-span-4">
					<div className="flex flex-col items-center">
						<img src={contactanosImg} alt="" />

						<div className="flex flex-col items-center w-full">
							<h1 className='text-amarillo text-2xl font-semibold'>¿Necesitas más ayuda?</h1>

							<Link to="contactanos" className='block w-full md:w-[70%] text-center rounded-3xl cursor-pointer bg-blanco py-4 mt-4 hover:bg-opacity-70'>
								<div  className="text-[.9rem] text-azul font-bold md:text-[1.3rem]">Contáctanos</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
		
	);
};
