import { HelpList } from '../components/HelpList';
import { HelpListInformation } from '../interfaces/helpListInformation';

interface Props {
	helpLists: HelpListInformation[];
}

export const HelpPage = ({ helpLists }: Props) => {
	return (
		<>
			<div className="contact-form-text">
				<h2>¿En qué podemos ayudarte?</h2>

{/* <<<<<<< HEAD
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
======= */}
				{helpLists.map((helpListInfo, index) => (
					<HelpList {...helpListInfo} key={index} />
				))}
			</div>
		</>
// >>>>>>> main
	);
};
