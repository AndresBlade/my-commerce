import { Link } from 'react-router-dom';
import { HelpCardInformation } from '../interfaces/HelpCardInformation';

export const HelpCard = ({ title, description }: HelpCardInformation) => {
	return (
		<Link to="#" className="cajita">
			<div className="texto-cajita">
				<h4>{title}</h4>
				{description && <p>{description}</p>}
			</div>
		</Link>
	);
};
