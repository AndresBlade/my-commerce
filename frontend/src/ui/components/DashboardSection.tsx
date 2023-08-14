import { Link } from 'react-router-dom';

interface Props {
	url: string;
	title: string;
}

export const DashboardSection = ({ url, title }: Props) => {
	return (
		<div className="enlaces__container">
			<Link className="enlace" to={url}>
				<i className="bx bx-grid-alt heading-white"></i>
				<span className="heading-white">{title}</span>
			</Link>
		</div>
	);
};
