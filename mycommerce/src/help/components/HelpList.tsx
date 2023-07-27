import { HelpListInformation } from '../interfaces/helpListInformation';
import { HelpCard } from './HelpCard';

export const HelpList = ({
	heading,
	helpCardInformation,
}: HelpListInformation) => {
	return (
		<div className="searchBox-container">
			<h3 className="heading">{heading}</h3>
			{helpCardInformation.map((info, index) => (
				<HelpCard {...info} key={index} />
			))}
		</div>
	);
};
