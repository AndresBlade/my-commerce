import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { createPurchase } from '../../purchases/helpers/createPurchase';
import { AuthContext } from '../../auth/context/AuthContext';
import { Product } from '../interfaces/Product';
import visa from '../../assets/visa.png';
import  paypal  from '../../assets/paypal.png';
import  bancamiga  from '../../assets/bancamiga.png';
import  parse  from 'postcss';

export const ProductDetails = ({
	nombre,
	descripcion,
	precio,
	id,
	tiendaProducto,
}: Product & {
	tiendaProducto: { RIF: number; nombre: string; imagen: string };
}) => {
	const [purchaseCompleted, setPurchaseCompleted] = useState<boolean>();
	const {
		user: { token },
	} = useContext(AuthContext);
	console.log(tiendaProducto);

	const [showModal, setShowModal] = useState(false);
	const [nroTarjeta, setNroTarjeta] = useState('');
	const [metodoPago, setMetodoPago] = useState('');
	const [showMessage, setShowMessage] = useState(false);
	const [messageContent, setMessageContent] = useState('');


	const modalClick = () => {
		setShowModal(!showModal);
	};

	const total_iva = parseFloat(precio) * 0.16;
	const bg_dark = showModal ? 'bg-modal' : 'bg-modal hidden';

	const modal = showModal
		? 'fixed left-0 right-0 top-10 bottom-0 m-auto bg-white w-[80%] h-[70%] rounded-lg'
		: 'hidden';

		const actualizarSaldo = ( 
			 ) => {
			const saldoString = localStorage.getItem('saldo');
			const saldo = saldoString !== null ? parseFloat(saldoString) : 0;

			if (parseFloat(precio) <= saldo) {
				const saldoAct = saldo - parseFloat(precio + total_iva);
				localStorage.setItem('saldo', saldoAct.toString());
				console.log('El saldo restante es:' + saldoAct);
			} else {
				setPurchaseCompleted(false);
				setMessageContent('Saldo insuficiente :(');
				alert('a')

				setTimeout(() => {
				setMessageContent('');
				setPurchaseCompleted(undefined);
				}, 1500);				
				
			}
		}
		
		const handleSubmit = (
			purchase: { producto_id: number; cantidad: number },
			token: string,
			setPurchaseState: React.Dispatch<React.SetStateAction<boolean | undefined>>
		) => {
				if (nroTarjeta.trim() === '' || !metodoPago) {
					setShowMessage(true);
					setPurchaseCompleted(false)

					setTimeout(() => {
					setShowMessage(false);
					setPurchaseCompleted(undefined)
					}, 1500);
				} else {
					createPurchase(token, purchase)
					.then(response => {
						console.log(response);
						setPurchaseState(true);
						actualizarSaldo();
					})
					.catch(() => {
						setPurchaseState(false);
					});
				};
			};


	return (
		<article className="w-[550px] h-[550px] bg-blanco flex rounded-lg flex-col p-8">
			<div className="w-full mb-4 flex gap-8 items-center">
				<img
					src={tiendaProducto.imagen}
					className="w-[100px] h-[100px] rounded-full"
					alt={tiendaProducto.nombre}
				/>
				<Link
					to={`/tienda/${tiendaProducto.RIF}`}
					className="text-[2rem] font-normal"
				>
					{tiendaProducto.nombre}
				</Link>
			</div>
			<h2 className="text-[1.7rem] mb-10 font-semibold">{nombre}</h2>
			<p className="text-[.9rem] mb-10">{descripcion}</p>
			<p className="text-[1.7rem] font-semibold w-full mb-12">${precio}</p>
			<button onClick={modalClick}
				className='flex items-center justify-center bg-dark-blue px-12 py-4 w-full rounded-lg border-none text-blanco text-[.9rem] font-bold hover:opacity-70'
			> Comprar ahora
			</button>

			<div className={bg_dark} onClick={modalClick}></div>

			<div className={modal}>
				<div className='relative m-6'>
					<div className='flex justify-between w-full'>
						<div className=''>
							<h1 className='text-xl font-normal mt-5'>Opciones de pago</h1>
							<div className='h-[.2rem] bg-azul mr-auto mt-2 w-[30%]'></div>
						</div>
						<div>
							<h1 className='text-xl font-normal mt-5'>Detalles de pago</h1>
							<div className='h-[.2rem] bg-azul ml-auto mt-2 w-[30%] mb-2'></div>
						</div>
					</div>

					<div className='flex justify-between gap-2'>
						<div className='flex flex-col mt-8'>
							<div className='flex-col flex gap-4 w-full'>
								<div className='flex gap-2 bg-gris p-4 rounded-xl'>
									<input 
										type="radio" 
										value='Nueva Tarjeta'
										checked={metodoPago === "Nueva Tarjeta"}
										onChange={(e) => setMetodoPago(e.target.value)}
									/>
									<div className='flex gap-2 items-center'>
										<p>Agregar una nueva tarjeta</p>
										<img className='ring-1 ring-azul w-12 h-6 object-contain' src={visa} alt="visa"/>
										<img className='ring-1 ring-azul w-20 h-6 object-contain' src={bancamiga} alt="bancamiga"/>
									</div>
								</div>

								<input 
									type="text" 
									value={nroTarjeta}
									onChange={(e) => setNroTarjeta(e.target.value)}
									placeholder='Nro. Tarjeta'
									className='ring-2 ring-gris p-4'
								/>

								<div className='flex gap-2 bg-gris p-4 rounded-xl'>
									<input 
										type="radio"
										value='PayPal'
										checked={metodoPago === "PayPal"}
										onChange={(e) => setMetodoPago(e.target.value)} 
									/>
									<div className='flex gap-2 items-center'>	
										<p>Pagar con PayPal</p>
										<img className='ring-1 ring-azul w-16 h-6 object-contain' src={paypal} alt="paypal" />
									</div>
								</div>

								<button className={`w-full text-md font-semibold text-blanco bg-azul p-4 block mt-auto hover:opacity-90 ${
									purchaseCompleted === undefined
									? ''
									: purchaseCompleted
									? 'bg-green-500 cursor-not-allowed'
									: 'bg-red-500 cursor-pointer'
								}`}
							
									onClick={() => {
										handleSubmit(
											{
											producto_id: id,
											cantidad: 1,
											},
											token,
											setPurchaseCompleted,
										);
									}} >
									{purchaseCompleted === undefined
										? 'Procesar Compra'
									: purchaseCompleted
										? '¡Comprado exitosamente!'
										: 'Error al comprar'}
								</button>
							</div>
						</div>

						<div className='w-[50%] bg-blanco rounded-lg p-4'>
							<div className='flex justify-between mb-2'>
								<h1 className='text-2xl font-semibold'>{nombre}</h1>
								<img className='w-16 h-16 rounded-full' src={tiendaProducto.imagen } alt="" />
							</div>
							<div className='bg-white w-full p-4 mb-2'>
								<div className='flex items-center justify-between gap-2 mb-4'>			
									<h2 className='text-xl'>Costo del producto:</h2>
									<span className='text-2xl'>{precio}$</span>
								</div>
								<div className='flex items-center justify-between gap-2'>			
									<h2 className='text-xl'>IVA (16%):</h2>
									<span className='text-xl'>{total_iva}$</span>
								</div>
							</div>
						
							<div className='flex items-center justify-between gap-2 p-4 bg-white'>			
								<h2 className='text-xl'>Total</h2>
								<span className='text-xl'>{parseFloat(precio) + total_iva}$</span>
							</div>
						</div>
					</div>
				</div>
				{showMessage && (
					<div className='relative p-2 bottom-0 w-[70%] text-center text-sm text-white rounded-xl bg-red-500 block mx-auto transition-all'>
						{messageContent
							? messageContent
							: 'Error al comprar'}
					</div>
				)}

			</div>
		</article>
	);
};