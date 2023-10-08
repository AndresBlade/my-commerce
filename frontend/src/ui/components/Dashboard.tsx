import { Outlet } from 'react-router';
import { DashboardSection } from './DashboardSection';
import { AuthContext } from '../../auth/context/AuthContext';
import { useContext } from 'react';

export const Dashboard = () => {
	const {
		user: {
			specificData: { admin },
		},
	} = useContext(AuthContext);
	return (
		<div className="perfil__container">
			<section className="menu-dashboard">
				<div className="menu">
					<DashboardSection title="Mi Perfil" url="" />
					{admin ? (
						<>
							<DashboardSection
								title="Registro de Tienda"
								url="tiendasPendientes"
							/>
						</>
					) : (
						<>
							<DashboardSection title="Compras" url="compras" />
							<DashboardSection title="Ventas" url="ventas" />
							<DashboardSection
								title="Mis Tiendas"
								url="tiendas"
							/>
						</>
					)}
				</div>
			</section>
			<Outlet />
		</div>
	);
};
