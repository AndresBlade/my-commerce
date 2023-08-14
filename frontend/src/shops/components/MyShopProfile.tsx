import { Shop } from '../interfaces/Shop';

type Props = {
	shop: Shop;
};

export const MyShopProfile = ({
	shop: { RIF, nombre, imagen, createdAt },
}: Props) => {
	return (
		<div className="sidebar-perfil">
			<div className="perfilTienda__contenedor">
				{/* <div> */}
				<img className="perfilTienda__imagen" src={imagen} />
				<p className="perfilTienda__nombre">{nombre}</p>
				<p className="perfilTienda__RIF">RIF: {RIF}</p>
				<p className="perfilTienda__fechaCreacion">
					Fecha de creación: {createdAt.split('T')[0]}
				</p>
				{/* </div> */}
			</div>
		</div>
	);
};
