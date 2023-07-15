import { Outlet } from 'react-router';
import { Header } from '../components/Header';
export const Layout = () => {
	console.log('layout');
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};
