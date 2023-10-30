import { Link } from 'react-router-dom';
import { Shop } from '../interfaces/Shop';
import { useState } from 'react';
import { Star } from '../../ui/components/starRating';

type Props = {
	shop: Shop;
};


export const MyShopProfile = ({
	shop: { RIF, nombre, imagen, createdAt, descripcion },
}: Props) => {

	const [showModal, setShowModal] = useState(false);

	const modalClick = () => {
		setShowModal(!showModal);
	};

	const bg_dark = showModal ? 'bg-modal z-10' : 'bg-modal hidden';

	const modal = showModal
		? 'z-20 fixed left-0 right-0 top-0 bottom-0 m-auto bg-white w-[80%] h-[70%] rounded-lg'
		: 'hidden';

	return (
		<div>
			<div className="m-4 h-screen">
				<div className="bg-blanco rounded-lg flex flex-col lg:flex-row items-center gap-2 p-2 ring-2 ring-gris">
					<img className="w-32 h-32 rounded-full" src={imagen} />
					<div className='flex flex-col md:flex-row md:text-left text-center justify-between items-center w-full m-2'>
						<div className='flex flex-col'>
							<p className="text-xl">{nombre}</p>
							<p className="text-sm">J-{RIF}</p>
						</div>
						<div className='flex flex-col'>
							<p className="text-md">Activa desde</p>
							<p className="text-sm">{createdAt.split('T')[0]}</p>
						</div>
					</div>
				</div>

				<div className='bg-blanco mt-4 p-4 ring-1 ring-gris'>
					<p className='text-md text-center'>{descripcion}</p>
				</div>

				<div className='mt-4 p-4'>
					<button 
						onClick={modalClick}
						className='w-full hover:opacity-90 block text-center bg-azul rounded-lg p-4 text-white font-normal'
					>
						Estadísticas
					</button>
				</div>
			</div>

			<div className={bg_dark} onClick={modalClick}></div>

			<div className={modal}>
				<div className='relative m-6'>
					<div className='flex justify-between'>
						<div>
							<h1 className='text-2xl font-normal mt-5'>Estadísticas de {nombre}</h1>
							<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[50%]'></div>
						</div>

						<img src={imagen} alt="" className='w-16 h-16 rounded-full' />
					</div>

				    <div className='grid grid-cols-2 gap-4 mt-5'>
						<div className='bg-blanco rounded-lg p-4 text-center'>
							<h2 className='text-lg font-semibold'>Ventas Mensuales</h2>
							<p className='text-3xl text-azul'>125</p>
						</div>

						<div className='bg-blanco rounded-lg p-4 text-center'>
							<h2 className='text-lg font-semibold'>Productos Vendidos</h2>
							<p className='text-3xl text-azul'>256</p>
						</div>

						<div className='bg-blanco rounded-lg p-4 text-center'>
							<h2 className='text-lg font-semibold'>Visitas al perfil</h2>
							<p className='text-3xl text-azul'>3200</p>
						</div>

						<div className='bg-blanco rounded-lg p-4 text-center'>
							<h2 className='text-lg font-semibold'>Ingresos Anuales</h2>
							<p className='text-3xl text-azul'>$50,000</p>
						</div>
					</div>

					<h1 className='text-2xl font-normal mt-5'>Calificaciones</h1>
					<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[15%]'></div>

					<div className='flex justify-center p-2 mt-4 w-full mx-auto bg-blanco rounded-lg'>
						<Star stars={Math.random() * 5} reviews={Math.floor(Math.random() * 101)}></Star>
					</div>
				</div>
			</div>
		</div>
	);
};
