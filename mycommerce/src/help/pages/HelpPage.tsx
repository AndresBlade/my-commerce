import { SesionModal } from '../../ui/components/SesionModal';
import contactanosImg from '../../assets/contactanos.png';
import asdf from '../../assets/asdf.png';
import { Link } from 'react-router-dom';
import { HelpList } from '../components/HelpList';
import { HelpListInformation } from '../interfaces/helpListInformation';

const helpLists: HelpListInformation[] = [
	{
		heading: 'Compras',
		helpCardInformation: [
			{
				title: '¿En qué podemos ayudarte?',
				description: 'Gestionar mis compras',
			},
			{ title: 'Preguntas frecuentes sobre compras' },
		],
	},
	{
		heading: 'Ventas',
		helpCardInformation: [
			{
				title: 'Gestionar ventas y articulos',
				description: 'Ventas, publicaciones, reputación...',
			},
			{ title: 'Preguntas frecuentes sobre ventas' },
		],
	},
	{
		heading: 'Ayuda con mi cuenta',
		helpCardInformation: [{ title: 'Configuración de mi cuenta o tienda' }],
	},
	{
		heading: 'Consulta Personalizada',
		helpCardInformation: [{ title: 'Contáctanos' }],
	},
];

export const HelpPage = () => {
	return (
		<main>
			<section className="section-contactanos">
				<div className="contacto-form">
					<div className="form">
						<div className="contact-form-text">
							<h2>¿En qué podemos ayudarte?</h2>

							{helpLists.map((helpListInfo, index) => (
								<HelpList {...helpListInfo} key={index} />
							))}
						</div>
					</div>

					<div className="info">
						<div className="imgBox">
							<img src={contactanosImg} alt="" />
						</div>
						<div className="info-textBox">
							<div className="info-contact">
								<ion-icon name="location-outline"></ion-icon>
								<p>Lara, Venezuela</p>
							</div>

							<div className="info-contact">
								<ion-icon name="mail-outline"></ion-icon>
								<p>cmmh2004iujo@gmail.com</p>
							</div>

							<div className="info-rrss">
								<Link to="#">
									<ion-icon name="logo-facebook"></ion-icon>
								</Link>
								<Link to="#">
									<ion-icon name="logo-twitter"></ion-icon>
								</Link>
								<Link to="#">
									<ion-icon name="logo-instagram"></ion-icon>
								</Link>
								<Link to="#">
									<ion-icon name="logo-whatsapp"></ion-icon>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section className="modalSesion">
				<div className="modalSesion__container">
					<img src={asdf} className="modalSesion__img" />
					<h2 className="modalSesion__title">
						¿Cómo me comunico con las tiendas?
					</h2>
					<p className="modalSesion__paragraph">Por wasap.</p>
					<Link to="#" className="modalSesion__close">
						Salir
					</Link>
				</div>
			</section>

			<SesionModal />
		</main>
	);
};
