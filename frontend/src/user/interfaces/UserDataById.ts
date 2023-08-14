export interface UserDataWrapper {
	data: UserData;
}

export interface UserData {
	id: number;
	nombre: string;
	correo: string;
	contrasenna: string;
	imagen: string | null;
	tipo_id: number;
	createdAt: Date;
	updatedAt: Date;
	tipo_usuario: TipoUsuario;
}

interface TipoUsuario {
	id: number;
	descripcion: string;
}
