import { HelpListInformation } from '../interfaces/helpListInformation';
import { HelpCard } from './HelpCard';

export const HelpList = ({
	heading,
	helpCardInformation,
}: HelpListInformation) => {
	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-blanco text-[2rem] pt-5 pb-1">{heading}</h3>
			{helpCardInformation.map((info, index) => (
				<HelpCard {...info} key={index} />
			))}
		</div>
	);
};
