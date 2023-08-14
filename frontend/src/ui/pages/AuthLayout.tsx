import { Outlet } from 'react-router';
import { Header } from '../components/Header';
export const AuthLayout = () => {
	console.log('layout');
	return (
		<>
			<Header authPage={false} />
			<Outlet />
		</>
	);
};
