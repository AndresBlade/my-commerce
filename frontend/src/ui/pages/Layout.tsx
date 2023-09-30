import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
export const Layout = () => {
	console.log('layout');
	return (
		<>
			<Header authPage={true} />
			<Outlet />
			<Footer />
		</>
	);
};
