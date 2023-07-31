import { Outlet } from 'react-router';
import { DashboardSection } from './DashboardSection';

export const Dashboard = () => {
	return (
		<div className="perfil__container">
			<section className="menu-dashboard">
				<div className="menu">
					<DashboardSection title="Mi Perfil" url="" />
					<DashboardSection title="Compras" url="compras" />
					<DashboardSection title="Ventas" url="ventas" />
					<DashboardSection title="Mis Tiendas" url="tiendas" />
				</div>
			</section>
			<Outlet />
		</div>
	);
};
