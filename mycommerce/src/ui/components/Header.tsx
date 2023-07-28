import { Link } from 'react-router-dom';
import { Nav } from './Nav';

interface Props {
	authPage: boolean;
}

export const Header = ({ authPage }: Props) => {
	return (
		<header className={authPage ? 'header' : 'header-2'}>
			<Link to="/" className="logo">
				LOGO
			</Link>

			{authPage && <Nav />}
		</header>
	);
};
