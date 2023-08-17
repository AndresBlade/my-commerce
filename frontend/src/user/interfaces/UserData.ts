export interface UserData {
	token: string;
	userData: User;
	clientData: Costumer;
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
}
