export interface UserDataWrapper {
	data: UserData;
}

export interface UserData {
	token: string;
	user: User;
}

interface User {
	id: number;
	nombre: string;
	correo: string;
	imagen: null;
	tipo_id: number;
	createdAt: Date;
	updatedAt: Date;
}
