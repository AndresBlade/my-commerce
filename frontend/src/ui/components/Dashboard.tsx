import { Outlet } from 'react-router';import { DashboardSection } from './DashboardSection';
import { useContext } from "react";
import { SideBarContext } from '../context/SideBarContext';
import { CgProfile, CgShoppingBag } from 'react-icons/cg';
import { PiHandshake } from 'react-icons/Pi';
import { AiOutlineShop } from 'react-icons/Ai';
import { LuChevronFirst, LuChevronLast } from 'react-icons/Lu';

export const Dashboard = () => {
	const { open, setOpen } = useContext(SideBarContext);

	const SideBarClick = () => {
		setOpen(!open);
	  };

  	const dbSectionChevron = open ? 'p-4 pb-2 mx-auto sm:mr-0' : 'p-4 pb-2 mx-auto';


	return (
		<div className="flex">
			<aside>
				<nav className="h-full flex flex-col border-r shadow-xl">
					<div className={dbSectionChevron}>
						<button
							onClick={SideBarClick}
							className="p-1.5 rounded-lg transition-all duration-200 bg-gray-50 hover:bg-gray-200 hover:rotate-180"
							>
							{open ? <LuChevronFirst size={20} /> : <LuChevronLast size={20}/>}
						</button>
					</div>

					<div className="px-4">
						<DashboardSection title="Mi Perfil" url="" icon={<CgProfile size={20}/>}/>
						<DashboardSection title="Compras" url="compras" icon={<CgShoppingBag size={20}/>}/>
						<DashboardSection title="Ventas" url="ventas" icon={<PiHandshake size={20}/>}/>
						<DashboardSection title="Tiendas" url="tiendas" icon={<AiOutlineShop size={20}/>}/>
					</div>
				</nav>
			</aside>
			<Outlet />
		</div>
	);
};
