import { Request, Response } from 'express';
import { tokenSign } from '../utils/handleJwt';
import handleHttpErrors from '../utils/handleErrors';
import { encryptPassword, comparePassword } from '../utils/handlePassword';
import UserModel from '../models/Usuarios';
import ClientModel from '../models/Clientes';
import { getClientID, getUserId } from '../utils/getClientID';
import { sequelize } from '../config/db';
import AdministradorModel from '../models/Administradores';
const PUBLIC_URL = process.env['PUBLIC_URL'] || 'http://localhost:3000';

export const registerUser = async (req: Request, res: Response) => {
	try {
		const { nombre, correo } = req.body;
		const rawPassword = req.body.contrasenna;

		const tipo_id = 1;
		const status = '0'; //Cliente activo

		//Encripta la contraseña
		const contrasenna = await encryptPassword(rawPassword);

		//define la imagen por defecto del usuario
		const defaultImage = `${PUBLIC_URL}/DefaultProfilePicture.jpeg`;

		//validar que el correo ingresado no sea repetido
		const user = await UserModel.findOne({ where: { correo } });
		if (user) return res.status(400).send('CORREO_ALREADY_REGISTERED');

		//Inserta los datos en la tabla usuarios
		const resultTransaction = await sequelize.transaction(
			async (t: any) => {
				const newUser = await UserModel.create(
					{
						correo,
						contrasenna,
						tipo_id,
						status,
					},
					{ transaction: t }
				);

				//Inserta los datos en la tabla clientes
				const newClient = await ClientModel.create(
					{
						usuario_id: newUser.id,
						nombre,
						imagen: defaultImage,
					},
					{ transaction: t }
				);

				return {
					token: await tokenSign(newUser),
					userData: {
						correo: newUser.correo,
						tipoId: newUser.tipo_id,
						createdAt: newUser.createdAt,
					},
					clientData: {
						id: newClient.id,
						nombre: newClient.nombre,
						imagen: newClient.imagen,
					},
				};
			}
		);

		return res.status(200).send({
			token: resultTransaction.token,
			userData: resultTransaction.userData,
			specificData: resultTransaction.clientData,
		});
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const loginUser = async (req: Request, res: Response) => {
	try {
		const { correo, contrasenna } = req.body;

		//Busca el usuario por el correo
		const userLogued = await UserModel.findOne({
			where: {
				correo: correo,
			},
		});
		if (!userLogued) return res.status(500).send('EMAIL_NOT_FOUND');
		if (userLogued.status == '1')
			return res.status(500).send('USER_NOT_FOUND');

		const userData = {
			correo: userLogued.correo,
			tipoId: userLogued.tipo_id,
			createdAt: userLogued.createdAt,
		};

		const hashPassword = userLogued.get('contrasenna');
		const passwordMatch = await comparePassword(contrasenna, hashPassword);

		if (!passwordMatch) {
			return handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
		}

		//Respuesta condicional de acuerdo si el usuario es un cliente o un administrador
		if (userLogued.tipo_id == 1) {
			//Busca el cliente asociado al usuario
			const userAndClient = await ClientModel.findClientByUserID(
				userLogued.id
			);
			return res.status(200).send({
				token: await tokenSign(userLogued),
				userData,
				specificData: {
					id: userAndClient?.id,
					nombre: userAndClient?.nombre,
					imagen: userAndClient?.imagen,
					admin: false,
				},
			});
		} else {
			//Busca el administrador asociado al usuario
			const admin = await AdministradorModel.getAdminByUserId(
				userLogued.id
			);
			return res.status(200).send({
				token: await tokenSign(userLogued),
				userData,
				specificData: {
					id: admin?.id,
					nombre: admin?.nombre,
					imagen: admin?.imagen,
					admin: true,
				},
			});
		}
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const updateUserImage = async (req: Request, res: Response) => {
	try {
		const client_id = getClientID(res);
		if (!req.body.imagen)
			return res.status(400).send('ERROR_GETTING_IMAGE');
		const imagen = req.body.imagen.trim();

		const clientUpdated = await ClientModel.update(
			{ imagen: imagen },
			{ where: { id: client_id } }
		);
		if (!clientUpdated) return res.send('CANNOT_UPDATE_CLIENT_IMAGE');

		return res.status(200).send({ nuevaImagen: imagen });
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const getUsuario = async (_req: Request, res: Response) => {
	console.log('Entraste compa');
	res.send('oki');
};

export const registerAdmin = async (req: Request, res: Response) => {
	try {
		const { nombre, correo, nivelPrivilegio } = req.body;
		const rawPassword = req.body.contrasenna;
		const tipo_id = 2;
		const status = '0'; //Cliente activo

		//Encripta la contraseña
		const contrasenna = await encryptPassword(rawPassword);

		//define la imagen por defecto del usuario
		const defaultImage = `${PUBLIC_URL}/DefaultProfilePicture.jpeg`;

		//validar que el correo ingresado no sea repetido
		const user = await UserModel.findOne({ where: { correo } });
		if (user) return res.status(400).send('CORREO_ALREADY_REGISTERED');

		const resultTransaction = await sequelize.transaction(
			async (t: any) => {
				const newUser = await UserModel.create(
					{
						correo,
						contrasenna,
						tipo_id,
						status,
					},
					{ transaction: t }
				);

				const newAdmin = await AdministradorModel.create(
					{
						usuario_id: newUser.id,
						nombre,
						imagen: defaultImage,
						nivel_privilegio: nivelPrivilegio,
					},
					{ transaction: t }
				);

				return {
					token: await tokenSign(newUser),
					userData: {
						correo: newUser.correo,
						tipoId: newUser.tipo_id,
					},
					adminData: {
						id: newAdmin.id,
						nombre: newAdmin.nombre,
						imagen: newAdmin.imagen,
						nivelPrivilegio: newAdmin.nivel_privilegio,
					},
				};
			}
		);

		return res.status(200).send(resultTransaction);
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const updateUserPassword = async (req: Request, res: Response) => {
	try {
		const userId = getUserId(res);
		const { oldPassword, newPassword } = req.body;

		//Busca el usuario por el id
		const userLogued = await UserModel.findOne({
			where: {
				id: userId,
			},
		});

		//verificar si el usuario existe
		if (!userLogued) return res.status(500).send('USER_NOT_FOUND');

		//validar contraseña vieja
		const hashPassword = userLogued.get('contrasenna');
		const passwordMatch = await comparePassword(oldPassword, hashPassword);
		if (!passwordMatch) {
			return handleHttpErrors(res, 'PASSWORD_NOT_MATCH', 401);
		}

		//actualiza la contraseña vieja por la nueva
		const newContrasennaEncrypted = await encryptPassword(newPassword);
		const userUpdated = await UserModel.update(
			{ contrasenna: newContrasennaEncrypted },
			{ where: { id: userId } }
		);
		if (!userUpdated) return res.send('CANNOT_UPDATE_USER_PASSWORD');

		return res.status(200).send('PASSWORD_UPDATED_SUCCESSFULLY');
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const updateUserName = async (req: Request, res: Response) => {
	try {
		const ClientID = getClientID(res);
		const { newUserName } = req.body;

		const checkClientName = await ClientModel.findOne({
			where: { nombre: newUserName },
		});
		if (checkClientName) return res.status(400).send('NAME_ALREADY_USED');

		const clientUpdated = await ClientModel.update(
			{ nombre: newUserName },
			{ where: { id: ClientID } }
		);
		if (!clientUpdated)
			return res.status(500).send('CANNOT_UPDATE_CLIENT_NAME');

		//busca el cliente actualizado
		const clientData = await ClientModel.findOne({
			where: { id: ClientID },
		});
		if (!clientData) return res.status(500).send('CANNOT_GET_CLIENT_DATA');

		const userUpdated = {
			id: clientData.id,
			nombre: clientData.nombre,
			imagen: clientData.imagen,
		};

		return res.status(200).send({ clientUpdated: userUpdated });
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const updateUserEmail = async (req: Request, res: Response) => {
	try {
		const UserID = getUserId(res);
		const { newUserEmail } = req.body;

		const checkClientEmail = await UserModel.findOne({
			where: { correo: newUserEmail },
		});
		if (checkClientEmail) return res.status(400).send('EMAIL_ALREADY_USED');

		const clientUpdated = await UserModel.update(
			{ correo: newUserEmail },
			{ where: { id: UserID } }
		);
		if (!clientUpdated)
			return res.status(500).send('CANNOT_UPDATE_CLIENT_NAME');

		//busca el usuario actualizado
		const userData = await UserModel.findOne({ where: { id: UserID } });
		if (!userData) return res.status(500).send('CANNOT_GET_USER_DATA');

		const userUpdated = {
			newEmail: userData.correo,
		};

		return res.status(200).send({ userUpdated });
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};

export const desactivateUser = async (_req: Request, res: Response) => {
	try {
		const userID = getUserId(res);
		const clientID = getClientID(res);

		//inicia una transacción para desactivar el usuario, sus tiendas asoadas y los productos que pertenecen a esas tiendas
		const resultTransaction = await sequelize.transaction(
			async (t: any) => {
				console.log('EMPIEZA TRANSACCION');
				//desactiva el usuario
				await UserModel.update(
					{ status: '1' }, //status 1 = desactivado
					{ where: { id: userID }, transaction: t }
				);

				//llama al método deactivateTiendasPerClient
				const desativedTiendas =
					await ClientModel.desactivateTiendasPerClient(clientID);
				//verificación
				if (!desativedTiendas)
					throw new Error('ERROR_DESACTIVATING_TIENDAS_PER_CLIENT');
				return true;
			}
		);
		if (!resultTransaction) throw new Error('ERROR_DESACTIVATING_USER');

		return res.status(200).send('USER_DESACTIVATED_SUCCESSFULLY');
	} catch (error: any) {
		console.log(error);
		return handleHttpErrors(error);
	}
};
