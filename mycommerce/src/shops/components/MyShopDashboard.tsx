import { CreateButton } from './CreateButton';
import { MyShopProfile } from './MyShopProfile';

export const MyShopDashboard = () => {
	return (
		<>
			<main className="misTiendas">
				<div className="Perfil__tienda">
					<CreateButton buttonTitle="Agregar Producto" />
					<aside className="menu-dashboard">
						<MyShopProfile />
					</aside>

					<div className="misTiendas__perfilTienda perfilTienda">
						<div className="misTiendas__grid"></div>
					</div>
				</div>
			</main>

			<div className="modal" id="modal">
				<div className="modal__dialog">
					<header className="modal__header">
						<h2 className="modal__title">Agregar Producto</h2>
						{/* <!-- <button className="modal__close">X</button> --> */}
					</header>
					<section className="modal__content">
						<form
							action=""
							className="modal__formModal formModal"
							encType="multipart/form-data"
						>
							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="name"
								>
									Nombre
								</label>
								<input
									type="text"
									name="nombre"
									id="name"
									className="formModal__text"
								/>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="price"
								>
									Precio
								</label>
								<input
									type="number"
									step="0.01"
									min="0"
									name="precio"
									id="price"
									className="formModal__number"
								/>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="category"
								>
									Categoría
								</label>
								<select
									name="categoria_id"
									id="category"
									className="formModal__select"
								></select>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="description"
								>
									Descripción
								</label>

								<textarea
									name="descripcion"
									className="formModal__textarea"
									id="description"
									cols={30}
									rows={10}
								></textarea>
							</div>

							<div className="formModal__Divider">
								<label
									className="formModal__label"
									htmlFor="Image"
								>
									Imagen
								</label>
								<input
									type="file"
									name="imagen"
									id="Image"
									className="formModal__image"
									accept="image/png, image/jpeg"
									multiple
								/>
							</div>

							<div className="formModal__errorBox"></div>
						</form>
						<button type="button" className="formModal__submit">
							Crear Producto
						</button>
					</section>
				</div>
			</div>
		</>
	);
};
