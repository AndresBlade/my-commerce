import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/style.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PaginaError } from './PaginaError';
import { ProtectedRoutes } from './router/ProtectedRoutes';
import { LoginPage } from './auth/pages/LoginPage';
import { AuthProvider } from './auth/context/AuthProvider';
import { Layout } from './ui/pages/Layout';
import LandingPage from './landing/pages/LandingPage';
import { ShopCard } from './shops/components/ShopCard';
import { Shop } from './shops/interfaces/Shop';
import { getShops } from './shops/helpers/getShops';
import { getProducts } from './products/helpers/getProducts';
import { ShopWrapper } from './shops/interfaces/ShopWrapper';
import { LandingLoader } from './landing/interfaces/LandingLoader';

const router = createBrowserRouter([
	{
		path: '/login',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <Layout />,

		children: [
			{
				element: <ProtectedRoutes />,

				children: [
					{ path: 'perfil', element: <div>Eres hombre muerto</div> },
					{ path: 'tiendas' },
				],
			},
			{
				index: true,
				element: <LandingPage />,
				loader: async () => {
					const data: LandingLoader = {
						ShopsData: await getShops(),
						ProductsData: await getProducts(),
					};

					return data;
				},
			},
		],

		errorElement: <PaginaError />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	</React.StrictMode>
);
