import { Shop } from './Shop';

export type PendingRegisterShop = Omit<Shop, 'tiendaCliente'>;
