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

				{helpLists.map((helpListInfo, index) => (
					<HelpList {...helpListInfo} key={index} />
				))}
			</div>
		</>
	);
};
