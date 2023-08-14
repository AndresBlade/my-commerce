import { useContext, ChangeEvent } from 'react';
import { AuthContext } from '../../auth/context/AuthContext';
import defaultUserImage from '../../assets/default_user_image.png';
import { setUserProfilePicture } from '../helpers/setUserProfilePicture';
import { getUserById } from '../helpers/getUserById';

export const ProfilePage = () => {
	const {
		userData: {
			user: { correo, nombre, imagen, id },
			token,
		},
		userData,
		setUserData,
	} = useContext(AuthContext);

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0] !== undefined)
			setUserProfilePicture(e.target.files?.[0], id, token)
				.then(() =>
					setTimeout(() => {
						getUserById(id, token)
							.then(response => {
								const { imagen } = response.data;
								setUserData({
									token,
									user: {
										...userData.user,
										imagen,
									},
								});
							})
							.catch(err => console.log(err));
					}, 200)
				)
				.catch(err => console.log(err));
	};

	return (
		<>
			<section className="tiendas-miPerfil">
				<div className="box-container-miPerfil">
					<div className="box-miPerfil">
						<div className="inner-container-miPerfil arriba">
							<label className="labelImg" htmlFor="input-file">
								<img
									src={imagen || defaultUserImage}
									id="profile-pic"
									alt=""
									className="circular-miPerfil"
								/>
							</label>
							<input
								type="file"
								className="input-fileImg"
								accept="image/*"
								id="input-file"
								onChange={handleImageChange}
							/>
							<h1 className="heading heading--nombreTienda">
								<p className="userProfile__name">{nombre}</p>
							</h1>
						</div>

						<div className="miPerfil__info">
							<p className="userProfile__email">{correo}</p>
							<a href="#">Editar</a>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};
