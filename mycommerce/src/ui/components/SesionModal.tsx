import CancelImg from '../../assets/cancel.png';

export const SesionModal = () => {
	return (
		<section className="modalSesion__sesion">
			<div className="modalSesion__sesion-container">
				<img src={CancelImg} className="modalSesion__sesion-img" />
				<h2 className="modalSesion__sesion-title">
					¿Desea salir de sesión?
				</h2>
				<div className="modalSesion__sesion-options">
					<a href="#" className="modalSesion__si">
						Sí
					</a>
					<a href="#" className="modalSesion__no">
						No
					</a>
				</div>
			</div>
		</section>
	);
};
