export const ContactUsPage = () => {
	return (
		<>
			<div className="">
				<h2 className='text-amarillo text-[2rem] font-medium mb-6'>¡Habla con nosotros!</h2>
				<p className="text-lg text-blanco">
					¡Hola! En MyCommerce nos encantaría saber de ti. Si tienes
					alguna duda, problema o sugerencia sobre nuestros productos
					o servicios, escríbenos a través de nuestro correo
					electrónico o redes sociales. Estamos siempre buscando
					maneras de mejorar para ofrecerte la mejor experiencia
					posible. ¡Gracias por escogernos!
				</p>
			</div>

			<form action="" className="mt-5">
				<div className="flex flex-col mb-3 items-center lg:items-start">
					<label className="text-blanco text-md font-semibold mb-2">Nombre</label>
					<input type="text" placeholder="Nombre..." className="bg-blanco"/>
				</div>

				<div className="flex flex-col items-center lg:items-start">
					<label className="text-blanco text-md font-semibold mb-2">Email</label>
					<input type="email" placeholder="Email..." className="bg-blanco"/>
				</div>

				<div className="flex flex-col items-center lg:items-start">
					<label className="text-blanco text-md font-semibold mb-2">Mensaje</label>
					<textarea
						name=""
						id=""
						cols={30}
						rows={5}
						placeholder="Mensaje..."
						className="bg-blanco rounded-[6px] mb-4 p-2 resize-none w-[92%]"
					></textarea>
				</div>
				<input 
				type="submit" 
				value="Enviar Mensaje" 
				className="bg-blanco text-azul font-semibold lg:w-[70%] md:text-[1.3rem] cursor-pointer mt-5 hover:opacity-80"/>
			</form>
		</>
	);
};
