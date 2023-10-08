export interface UserData {
	token: string;
	userData: User;
	specificData: Costumer;
}

interface User {
	correo: string;
	tipoId: number;
	createdAt: string;
}

interface Costumer {
	id: number;
	nombre: string;
	imagen: string;
	admin: boolean;
}
