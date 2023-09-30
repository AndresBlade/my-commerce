import { HelpListInformation } from '../interfaces/helpListInformation';

export const helpLists: HelpListInformation[] = [
	{
		heading: 'Compras',
		helpCardInformation: [
			{
				title: '¿En qué podemos ayudarte?',
				description: 'Gestionar mis compras',
			},
			{ title: 'Preguntas frecuentes sobre compras' },
		],
	},
	{
		heading: 'Ventas',
		helpCardInformation: [
			{
				title: 'Gestionar ventas y articulos',
				description: 'Ventas, publicaciones, reputación...',
			},
			{ title: 'Preguntas frecuentes sobre ventas' },
		],
	},
	{
		heading: 'Ayuda con mi cuenta',
		helpCardInformation: [{ title: 'Configuración de mi cuenta o tienda' }],
	},
];
