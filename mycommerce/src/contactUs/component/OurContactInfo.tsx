import { Link } from 'react-router-dom';
import contactanosImg from '../../assets/contactanos.png';

export const OurContactInfo = () => {
	return (
		<div className="info">
			<div className="imgBox">
				<img src={contactanosImg} alt="" />
			</div>
			<div className="info-textBox">
				<div className="info-contact">
					<ion-icon name="location-outline"></ion-icon>
					<p>Burundí, Cankuzo</p>
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
	);
};
