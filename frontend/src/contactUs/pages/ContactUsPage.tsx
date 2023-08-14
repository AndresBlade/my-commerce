export const ContactUsPage = () => {
	return (
		<>
			<div className="contact-form-text">
				<h2>¡Habla con nosotros!</h2>
				<p>
					¡Hola! En MyCommerce nos encantaría saber de ti. Si tienes
					alguna duda, problema o sugerencia sobre nuestros productos
					o servicios, escríbenos a través de nuestro correo
					electrónico o redes sociales. Estamos siempre buscando
					maneras de mejorar para ofrecerte la mejor experiencia
					posible. ¡Gracias por escogernos!
				</p>
			</div>
			<form action="">
				<div className="inputbox">
					<label htmlFor="">Tu nombre</label>
					<input type="text" placeholder="Nombre..." />
				</div>

				<div className="inputbox">
					<label htmlFor="">Tu email</label>
					<input type="email" placeholder="Email..." />
				</div>

				<div className="inputbox">
					<label htmlFor=""></label>
					<textarea
						name=""
						id=""
						cols={30}
						rows={5}
						placeholder="Mensaje..."
					></textarea>
				</div>
				<input type="submit" value="Enviar Mensaje" />
			</form>
		</>
	);
};
