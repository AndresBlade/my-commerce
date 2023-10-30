import { useLoaderData } from 'react-router';
import { ShopLoader } from '../interfaces/ShopLoader';
import { useState } from 'react';
import { Star } from '../../ui/components/starRating';
import neutral from '../../assets/neutro.webp'

export const ShopProfile = () => {
	const { shopData } = useLoaderData() as ShopLoader;
	const { datosTienda } = shopData;

	const [showModal, setShowModal] = useState(false);
	
	const [showModalCalificar, setShowModalCalificar] = useState(false);

	const modalClick = () => {
		setShowModal(!showModal);
	};

	const modalClickCalificar = () => {
		setShowModalCalificar(!showModalCalificar);
	};

	const bg_dark = showModal ? 'bg-modal z-10' : 'bg-modal hidden';

	const modal = showModal
		? 'z-20 fixed left-0 right-0 top-0 bottom-0 m-auto bg-white w-[80%] h-[70%] rounded-lg'
		: 'hidden';

	const bg_darkCalificar = showModalCalificar ? 'bg-modal z-10' : 'bg-modal hidden';

	const modalCalificar = showModalCalificar
		? 'z-20 fixed left-0 right-0 top-0 bottom-0 m-auto bg-white w-[80%] h-[70%] rounded-lg'
		: 'hidden';

	return (
		<aside className="w-[50%]">
			<nav className="h-full flex flex-col border-r shadow-xl">
				<div className="m-4 h-screen">
					<div className="bg-blanco rounded-lg flex flex-col lg:flex-row items-center gap-2 p-2 ring-2 ring-gris">
						<img
							className="w-32 h-32 rounded-full"
							alt="Tienda-logo"
							src={datosTienda.imagen}
						/>
						<div className='flex flex-col md:flex-row md:text-left text-center justify-between items-center w-full m-2'>
							<div className='flex flex-col'>
								<p className="text-xl">
									{datosTienda.nombre}
								</p>
								<p className='text-sm'>
									J-{datosTienda.RIF}
								</p>
							</div>
							<div className='flex flex-col'>
								<p className="text-md">
									Activa desde
								</p>
								<p className="text-sm">
									{datosTienda.createdAt.split('T')[0]}
								</p>
							</div>
						</div>
					</div>

					<div className='bg-blanco mt-4 p-4 ring-1 ring-gris'>
						<p className="text-md text-center">
							{datosTienda.descripcion}
						</p>
					</div>

					<div className='mt-4 p-4'>
						<button 
						onClick={modalClick}
						className='w-full mb-4 hover:opacity-90 block text-center bg-azul rounded-lg p-4 text-white font-normal'
						>
							Reputación 
						</button>
						<button 
						onClick={modalClickCalificar}
						className='w-full hover:opacity-90 block text-center bg-azul rounded-lg p-4 text-white font-normal'
						>
							Calificar 
						</button>
					</div>
				</div>
				
				<div className={bg_dark} onClick={modalClick}></div>
				<div className={bg_darkCalificar} onClick={modalClickCalificar}></div>

			{showModal && (
				<div className={modal}>
					<div className='relative m-6'>
						<div className='flex justify-between'>
							<div>
								<h1 className='text-2xl font-normal mt-5'>Reputación de {datosTienda.nombre}</h1>
								<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[50%]'></div>
							</div>

							<img src={datosTienda.imagen} alt="" className='w-16 h-16 rounded-full' />
						</div>
					
						<div className='grid grid-cols-2 gap-4 my-5'>
							<div className='bg-blanco rounded-lg p-4 text-center'>
								<h2 className='text-lg font-semibold'>Calificación Promedio</h2>							
								<Star stars={Math.random() * 5} reviews={Math.floor(Math.random() * 101)}></Star>
							</div>
							<div className='bg-blanco rounded-lg p-4 text-center flex flex-col `justify-center'>
								<h2 className='text-lg font-semibold'>Ventas realizadas</h2>
								<p className='text-3xl text-azul'>56</p>
							</div>
						</div>

						<div className='bg-blanco rounded-lg p-4 text-center'>
							<h2 className='text-lg font-semibold'>¿Debería comprar a {datosTienda.nombre}?</h2>
							<div className='flex gap-4 items-center'>
								<img className='w-40 h-40'
								src={neutral} 
								alt="emoji-satisfaccion" />
								<p className='text-left'>La tienda tiene una calificación de 3 estrellas, 
									lo que indica que algunos clientes han tenido experiencias positivas allí. 
									Sin embargo, también sugiere que hay margen de mejora. 
									Si decides comprar en esta tienda, asegúrate de hacer una investigación
									exhaustiva sobre los productos que te interesan. Recuerda, la decisión final siempre depende de ti. 😊
								</p>
							</div>
						</div>
					</div>
				</div>
				)}

				{showModalCalificar && (
				<div className={modalCalificar}>
					<div className='relative m-6'>
						<div className='flex justify-between'>
							<div>
								<h1 className='text-2xl font-normal mt-5'>¿Cómo calificarías a {datosTienda.nombre}?</h1>
								<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[50%]'></div>
							</div>

							<img src={datosTienda.imagen} alt="" className='w-16 h-16 rounded-full' />
						</div>
					</div>

					
				</div>
				)}
			</nav>
		</aside>
	);
};
