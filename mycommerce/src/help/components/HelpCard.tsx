import { Link } from 'react-router-dom';
import { HelpCardInformation } from '../interfaces/HelpCardInformation';

export const HelpCard = ({ title, description }: HelpCardInformation) => {
	return (
		<Link to="#" className="flex transition-[0.2s] cursor-pointer items-center justify-start shadow-sm bg-gris rounded-br-3xl rounded-tr-3xl h-20 hover:transform hover:-translate-y-1 hover:shadow-md">
			<div className="block pl-2 md:pl-6 mr-auto items-start">
				<h4 className='font-medium text-[.9rem] md:text-[1.1rem] text-left'>{title}</h4>
				{description && <p className='text-dark-blue text-[.7rem] md:text-[.9rem] text-left'>{description}</p>}
			</div>
		</Link>
	);
};

